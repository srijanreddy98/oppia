// Copyright 2016 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Directive for a schema-based editor for integers.
 */

require(
  'components/forms/custom-forms-directives/apply-validation.directive.ts');

angular.module('oppia').directive('schemaBasedIntEditor', [
  function() {
    return {
      restrict: 'E',
      scope: {},
      bindToController: {
        localValue: '=',
        isDisabled: '&',
        validators: '&',
        labelForFocusTarget: '&',
        onInputBlur: '=',
        onInputFocus: '='
      },
      template: require('./schema-based-int-editor.directive.html'),
      controllerAs: '$ctrl',
      controller: [
        '$scope', function($scope) {
          var ctrl = this;
          ctrl.onKeypress = function(evt) {
            if (evt.keyCode === 13) {
              $scope.$emit('submittedSchemaBasedIntForm');
            }
          };
          ctrl.$onInit = function() {
            if (ctrl.localValue === undefined) {
              ctrl.localValue = 0;
            }
          };
        }
      ]
    };
  }]);
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'schema-based-int-editor'
})
export class SchemaBasedIntEditorDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('schemaBasedIntEditor', elementRef, injector);
  }
}
