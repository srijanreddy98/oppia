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
 * @fileoverview Utility service for language operations.
 */

import { downgradeInjectable } from '@angular/upgrade/static';
import { Injectable } from '@angular/core';

import {
  AudioLanguageBackendDict,
  AudioLanguage
} from 'domain/utilities/audio-language.model';
import {
  AutogeneratedAudioLanguageDict,
  AutogeneratedAudioLanguage
} from 'domain/utilities/autogenerated-audio-language.model';
import { BrowserCheckerService } from
  'domain/utilities/browser-checker.service';

const CONSTANTS = require('constants.ts');

interface SupportedAudioLanguagesDict {
  [language: string]: AudioLanguage;
}

interface AutogeneratedAudioLanguagesByType {
  [language: string]: AutogeneratedAudioLanguage;
}

interface SupportedContentLanguageItem {
  code: string,
  description: string
}

interface LanguageIdAndText {
  id: string;
  text: string;
}

interface ContentLanguage {
  code: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageUtilService {
  supportedAudioLanguageList: AudioLanguageBackendDict[] = (
      CONSTANTS.SUPPORTED_AUDIO_LANGUAGES);
  autogeneratedAudioLanguageList: AutogeneratedAudioLanguageDict[] = (
      CONSTANTS.AUTOGENERATED_AUDIO_LANGUAGES);
  supportedContentLanguages: readonly SupportedContentLanguageItem[] = (
  CONSTANTS.SUPPORTED_CONTENT_LANGUAGES);
  constructor(
    private browserChecker: BrowserCheckerService) {}

  getSupportedAudioLanguages(): SupportedAudioLanguagesDict {
    var supportedAudioLanguages = {};
    this.supportedAudioLanguageList.forEach(audioLanguageDict => {
      supportedAudioLanguages[audioLanguageDict.id] =
        AudioLanguage.createFromDict(audioLanguageDict);
    });
    return supportedAudioLanguages;
  }

  getAllAudioLanguageCodes(): string[] {
    var allAudioLanguageCodes = (
      this.supportedAudioLanguageList.map(audioLanguage => {
        return audioLanguage.id;
      }));
    return allAudioLanguageCodes;
  }

  getAutogeneratedAudioLanguages(
      type: string): AutogeneratedAudioLanguagesByType {
    var autogeneratedAudioLanguagesByType = {};
    this.autogeneratedAudioLanguageList.forEach(
      autogeneratedAudioLanguageDict => {
        var autogeneratedAudioLanguage =
          AutogeneratedAudioLanguage.createFromDict(
            autogeneratedAudioLanguageDict);

        if (type === 'exp-lang-code') {
          autogeneratedAudioLanguagesByType[
            autogeneratedAudioLanguage.explorationLanguage] =
              autogeneratedAudioLanguage;
        } else if (type === 'autogen-lang-code') {
          autogeneratedAudioLanguagesByType[
            autogeneratedAudioLanguage.id] =
              autogeneratedAudioLanguage;
        } else {
          throw new Error('Invalid type: ' + type);
        }
      }
    );
    return autogeneratedAudioLanguagesByType;
  }

  getShortLanguageDescription(fullLanguageDescription: string): string {
    var ind = fullLanguageDescription.indexOf(' (');
    if (ind === -1) {
      return fullLanguageDescription;
    } else {
      return fullLanguageDescription.substring(0, ind);
    }
  }

  getLanguageIdsAndTexts(): LanguageIdAndText[] {
    var languageIdsAndTexts = this.supportedContentLanguages.map(
      (languageItem: ContentLanguage) => {
        return {
          id: languageItem.code,
          text: this.getShortLanguageDescription(languageItem.description)
        };
      });
    return languageIdsAndTexts;
  }
  getAudioLanguagesCount(): number {
    return this.getAllAudioLanguageCodes().length;
  }
  getAllVoiceoverLanguageCodes(): string[] {
    return this.getAllAudioLanguageCodes();
  }
  getAudioLanguageDescription(audioLanguageCode: string): string {
    const language = this.getSupportedAudioLanguages()[audioLanguageCode];
    return language ? language.description : null;
  }
  // Given a list of audio language codes, returns the complement list, i.e.
  // the list of audio language codes not in the input list.
  getComplementAudioLanguageCodes(
      audioLanguageCodes: string[]): string[] {
    return this.getAllAudioLanguageCodes().filter(languageCode => {
      return audioLanguageCodes.indexOf(languageCode) === -1;
    });
  }
  getLanguageCodesRelatedToAudioLanguageCode(
      audioLanguageCode: string): string[] {
    return (
      this.getSupportedAudioLanguages()[audioLanguageCode].relatedLanguages);
  }
  supportsAutogeneratedAudio(explorationLanguageCode: string): boolean {
    return (
      this.browserChecker.supportsSpeechSynthesis() &&
      this.getAutogeneratedAudioLanguages('exp-lang-code')
        .hasOwnProperty(explorationLanguageCode));
  }
  isAutogeneratedAudioLanguage(audioLanguageCode: string): boolean {
    return this.getAutogeneratedAudioLanguages('autogen-lang-code')
      .hasOwnProperty(audioLanguageCode);
  }

  getAutogeneratedAudioLanguage(
      explorationLanguageCode: string): AutogeneratedAudioLanguage {
    return this.getAutogeneratedAudioLanguages('exp-lang-code')[
      explorationLanguageCode];
  }
}

angular.module('oppia').factory(
  'LanguageUtilService', downgradeInjectable(LanguageUtilService));
