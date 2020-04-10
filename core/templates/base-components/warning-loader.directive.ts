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
 * @fileoverview Directive for warning_loader.
 */

require('services/alerts.service.ts');

angular.module('oppia').directive('warningLoader', [
  function() {
    return {
      restrict: 'E',
      scope: {},
      bindToController: {},
      template: require('./warning-loader.directive.html'),
      controllerAs: '$ctrl',
      controller: ['AlertsService', '$rootScope',
        function(AlertsService, $rootScope) {
          var ctrl = this;
          ctrl.$onInit = function() {
            ctrl.AlertsService = AlertsService;
            /**
           * TODO(@srijanreddy98), when migrating to angular 8 remove the $on
           * by subscribing to the loadingMessage subject from
           * common-events.service.ts
           */
            $rootScope.$on('loadingMessageChange', function(event, value) {
              $rootScope.loadingMessage = value;
            });
          };
        }
      ]
    };
  }
]);
