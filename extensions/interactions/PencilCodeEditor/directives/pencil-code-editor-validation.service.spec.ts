// Copyright 2020 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for Pencil Code Editor Validation Service.
 */

import { AnswerGroupObjectFactory } from
  'domain/exploration/AnswerGroupObjectFactory';
import { AppConstants } from 'app.constants';
import { OutcomeObjectFactory } from
  'domain/exploration/OutcomeObjectFactory';
import { PencilCodeEditorValidationService } from
  // eslint-disable-next-line max-len
  'interactions/PencilCodeEditor/directives/pencil-code-editor-validation.service';
import { RuleObjectFactory, RuleInputs } from
  'domain/exploration/RuleObjectFactory';
import { TestBed } from '@angular/core/testing';

describe('Pencil Code Editor Validation Service', () => {
  let pcevs: PencilCodeEditorValidationService = null;
  let oof: OutcomeObjectFactory = null;
  let rof: RuleObjectFactory = null;
  let inputBackend: RuleInputs = null;
  let agof : AnswerGroupObjectFactory = null;

  beforeEach(() => {
    oof = TestBed.inject(OutcomeObjectFactory);
    pcevs = TestBed.inject(PencilCodeEditorValidationService);
    rof = TestBed.inject(RuleObjectFactory);
    agof = TestBed.inject(AnswerGroupObjectFactory);
  });

  describe('on calling getCustomizationArgsWarnings', () => {
    it('should return empty list when feedback is given', () => {
      var customizationArgs = {
        initialCode: {
          value: ' Add the initial code snippet here.↵code is here'
        }
      };

      expect(pcevs.getCustomizationArgsWarnings(customizationArgs)).toEqual([]);
    });
  });

  describe('on calling getAllWarnings', () => {
    it('should return error when no feedback is given', () => {
      var statename = 'Introduction';
      var customizationArgs = {
        initialCode: {
          value: ' Add the initial code snippet here.↵code is here'
        }
      };
      const testOutcome1 = oof.createNew(
        'Introduction', 'default_outcome', '', []);
      var answergroup1 = [];
      var partialWarningsList = [];
      partialWarningsList.push({
        type: AppConstants.WARNING_TYPES.ERROR,
        message: (
          'Please add feedback for the user in the [All other answers] ' +
          'rule.')
      });

      // It returns the error when feedback is not provided.
      expect(pcevs.getAllWarnings(
        statename, customizationArgs, answergroup1, testOutcome1)
      ).toEqual(partialWarningsList);

      inputBackend = {
        x: [['<p>one</p>']]
      };
      const testOutcome2 = oof.createNew(
        'Introduction', 'feedback_0', '<p>YES</p>', []);
      let rulesDict = rof.createNew('CodeEquals', inputBackend, {
        x: 'CodeString'
      });
      let answergroup2 = agof.createNew([rulesDict], testOutcome2, [], null);

      // It also returns the error when feedback is not provided.
      expect(pcevs.getAllWarnings(
        statename, customizationArgs,
        [answergroup2], testOutcome1)
      ).toEqual(partialWarningsList);
    });

    it('should not return error when feedback is given', () => {
      var statename = 'Introduction';
      var customizationArgs = {
        initialCode: {
          value: ' Add the initial code snippet here.↵code is here'
        }
      };
      inputBackend = {
        x: [['<p>one</p>']]
      };
      const testOutcome = oof.createNew(
        'Introduction', 'feedback_0', '<p>YES</p>', []);
      let rulesDict = rof.createNew('CodeEquals', inputBackend, {
        x: 'CodeString'
      });
      let answergroup2 = agof.createNew([rulesDict], testOutcome, [], null);
      const testOutcome2 = oof.createNew(
        'Introduction', 'default_outcome',
        '<p>no</p>', []);

      // It returns the list when feedback is provided.
      expect(pcevs.getAllWarnings(
        statename, customizationArgs, [answergroup2], testOutcome2)
      ).toEqual([]);
    });

    it('should call getCustomizationArgsWarnings', () => {
      var statename = 'Introduction';
      var customizationArgs = {
        initialCode: {
          value: ' Add the initial code snippet here.↵code is here'
        }
      };
      const testOutcome1 = oof.createNew(
        'Introduction', 'default_outcome', '', []);
      var answergroup1 = [];

      spyOn(pcevs, 'getCustomizationArgsWarnings')
        .withArgs(customizationArgs).and.returnValue([]);

      // It returns the error when feedback is not provided.
      pcevs.getAllWarnings(
        statename, customizationArgs, answergroup1, testOutcome1);

      // It checks the getCustomizationArgsWarnings has been called or not.
      expect(pcevs.getCustomizationArgsWarnings).toHaveBeenCalled();
    });
  });
});
