// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Service for sending messages to a parent iframe. All outbound
 * communication with a parent iframe should pass through here. (This
 * communication should be outbound only; reverse communication should NOT
 * be attempted due to cross-domain security issues.)
 */

import { downgradeInjectable } from '@angular/upgrade/static';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoggerService } from 'services/contextual/logger.service';
import { WindowRef } from 'services/contextual/window-ref.service';

interface MessageValidatorsType {
  heightChange: ((payload: {height: number; scroll: number}) => boolean);
  explorationLoaded: (() => boolean);
  stateTransition: (
    (payload: {oldStateName: string; newStateName: string}) => boolean);
  explorationReset: ((payload: {stateName: string}) => boolean);
  explorationCompleted: (() => boolean);
}

interface HeightChangeData {
  height: number;
  scroll: number;
}

interface ExplorationLoadedData {
  explorationVersion: number;
  explorationTitle: string;
}

interface StateTransitionData {
  explorationVersion: number;
  oldStateName: string;
  jsonAnswer: string;
  newStateName: string;
}

interface ExplorationCompletedData {
  explorationVersion: number;
}

interface GetPayloadType {
  heightChange: ((data: HeightChangeData) => HeightChangeData);
  explorationLoaded: ((data: ExplorationLoadedData) => ExplorationLoadedData);
  stateTransition: ((data: StateTransitionData) => StateTransitionData);
  explorationCompleted: (
    (data: ExplorationCompletedData) => ExplorationCompletedData);
  explorationReset: ((data: string) => {stateName: string});
}

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  constructor(
    private loggerService: LoggerService, private windowRef: WindowRef) {}

  HEIGHT_CHANGE: string = 'heightChange';
  EXPLORATION_LOADED: string = 'explorationLoaded';
  STATE_TRANSITION: string = 'stateTransition';
  EXPLORATION_RESET: string = 'explorationReset';
  EXPLORATION_COMPLETED: string = 'explorationCompleted';

  SUPPORTED_HASHDICT_VERSIONS: string[] = [
    '0.0.0', '0.0.1', '0.0.2', '0.0.3'
  ];

  MESSAGE_VALIDATORS: MessageValidatorsType = {
    heightChange(payload): boolean {
      return this.isPositiveInteger(payload.height) && this.isBoolean(
        payload.scroll);
    },
    explorationLoaded(): boolean {
      return true;
    },
    stateTransition(payload): boolean {
      return Boolean(payload.oldStateName) || Boolean(payload.newStateName);
    },
    explorationReset(payload): boolean {
      return Boolean(payload.stateName);
    },
    explorationCompleted(): boolean {
      return true;
    }
  };

  getPayload: GetPayloadType = {
    heightChange(data) {
      return {
        height: data.height,
        scroll: data.scroll
      };
    },
    explorationLoaded(data) {
      return {
        explorationVersion: data.explorationVersion,
        explorationTitle: data.explorationTitle
      };
    },
    stateTransition(data) {
      return {
        explorationVersion: data.explorationVersion,
        oldStateName: data.oldStateName,
        jsonAnswer: data.jsonAnswer,
        newStateName: data.newStateName
      };
    },
    explorationCompleted(data) {
      return {
        explorationVersion: data.explorationVersion
      };
    },
    // DEPRECATED
    explorationReset(data) {
      return {
        stateName: data
      };
    }
  };

  private isPositiveInteger(n: Object): boolean {
    return (typeof n === 'number' && n % 1 === 0 && n > 0);
  }

  private isBoolean(b: Object): boolean {
    return typeof b === 'boolean';
  }

  sendMessage(messageTitle: string, messageData): void {
    // TODO(sll): For the stateTransition and explorationCompleted events,
    // we now send paramValues in the messageData. We should broadcast these
    // to the parent page as well.
    // TODO(sll): Delete/deprecate 'reset exploration' from the list of
    // events sent to a container page.

    // Only send a message to the parent if the oppia window is iframed and
    // a hash is passed in.
    var window = this.windowRef.nativeWindow;
    var rawHash = window.location.hash.substring(1);
    if (window.parent !== window && rawHash &&
        this.MESSAGE_VALIDATORS.hasOwnProperty(messageTitle)) {
      // Protractor tests may prepend a / to this hash, which we remove:
      var hash =
        (rawHash.charAt(0) === '/') ? rawHash.substring(1) : rawHash;
      var hashParts = hash.split('&');
      var hashDict = {
        version: null,
        secret: null,
        tagid: null
      };
      for (var i = 0; i < hashParts.length; i++) {
        if (hashParts[i].indexOf('=') === -1) {
          this.loggerService.error('Invalid hash for embedding: ' + hash);
          return;
        }

        var separatorLocation = hashParts[i].indexOf('=');
        hashDict[hashParts[i].substring(0, separatorLocation)] = (
          hashParts[i].substring(separatorLocation + 1));
      }

      if (!hashDict.version || !hashDict.secret) {
        this.loggerService.error('Invalid hash for embedding: ' + hash);
        return;
      }

      if (this.SUPPORTED_HASHDICT_VERSIONS.indexOf(hashDict.version) !== -1) {
        this.loggerService.info('Posting message to parent: ' + messageTitle);

        var payload = this.getPayload[messageTitle](messageData);
        if (!this.MESSAGE_VALIDATORS[messageTitle](payload)) {
          this.loggerService.error('Error validating payload: ' + payload);
          return;
        }

        this.loggerService.info(payload);

        var objToSendToParent = {
          title: messageTitle,
          payload: payload,
          sourceTagId: null,
          secret: null
        };
        if (hashDict.version === '0.0.0') {
          // Ensure backwards-compatibility.
          objToSendToParent.sourceTagId = hashDict.tagid;
          objToSendToParent.secret = hashDict.secret;
        }

        // The targetOrigin needs to be * because any page can iframe an
        // exploration.
        window.parent.postMessage(JSON.stringify(objToSendToParent), '*');
      } else {
        this.loggerService.error(
          'Unknown version for embedding: ' + hashDict.version);
        return;
      }
    }
  }
}
angular.module('oppia').factory('MessengerService',
  downgradeInjectable(MessengerService));
