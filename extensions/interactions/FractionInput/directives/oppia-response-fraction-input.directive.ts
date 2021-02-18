// Copyright 2019 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Directive for the FractionInput response.
 */

require('domain/objects/FractionObjectFactory.ts');
require('domain/utilities/url-interpolation.service.ts');
require('services/html-escaper.service.ts');

angular.module('oppia').directive('oppiaResponseFractionInput', [
  'FractionObjectFactory', 'HtmlEscaperService',
  function(FractionObjectFactory, HtmlEscaperService) {
    return {
      restrict: 'E',
      scope: {},
      bindToController: {},
      template: require('./fraction-input-response.directive.html'),
      controllerAs: '$ctrl',
      controller: ['$attrs', function($attrs) {
        var ctrl = this;
        ctrl.$onInit = function() {
          console.log($attrs);
          var answer = HtmlEscaperService.escapedJsonToObj($attrs.answer);
          console.log(FractionObjectFactory.fromDict(answer));
          ctrl.answer = FractionObjectFactory.fromDict(answer).toString();
        };
      }]
    };
  }
]);
