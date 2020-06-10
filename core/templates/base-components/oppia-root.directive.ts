/* eslint-disable max-len */
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
 * @fileoverview The root directive of the oppia ajs application.
 */

import { OppiaAngularRootComponent } from
  'components/oppia-angular-root.component';
angular.module('oppia').directive('oppiaRoot', [
  function() {
    return {
      template: require('./oppia-root.directive.html'),
      scope: {},
      transclude: {
        app: 'app',
      },
      controllerAs: '$ctrl',
      controller: ['$scope',
        function($scope) {
          var start = Date.now();
          $scope.initialized = false;

          $scope.onInit = function() {
            console.log(Date.now() - start);
            angular.module('oppia').config(['$provide', function($provide) {
              var servicesToProvide = [
                'AlertsService', 'BackgroundMaskService', 'BrowserCheckerService',
                'CodeReplRulesService', 'CollectionCreationBackendService',
                'CollectionCreationBackendService',
                'ContextService', 'CreatorDashboardBackendApiService', 'CsrfTokenService',
                'DateTimeFormatService', 'DebouncerService', 'DeviceInfoService',
                'DocumentAttributeCustomizationService',
                'ExplorationHtmlFormatterService', 'ExplorationObjectFactory',
                'ExpressionParserService', 'ExtensionTagAssemblerService',
                'ExtractImageFilenamesFromStateService',
                'HtmlEscaperService', 'IdGenerationService', 'InteractionObjectFactory',
                'InteractionRulesRegistryService', 'LanguageUtilService',
                'LoaderService', 'LocalStorageService', 'LoggerService',
                'MetaTagCustomizationService', 'NormalizeWhitespacePipe',
                'NormalizeWhitespacePunctuationAndCasePipe', 'PageTitleService',
                'PencilCodeEditorRulesService', 'ProfilePageBackendApiService',
                'RatingComputationService',
                'SchemaDefaultValueService', 'SchemaUndefinedLastElementService',
                'SidebarStatusService', 'SiteAnalyticsService', 'SkillObjectFactory',
                'SolutionObjectFactory', 'StateCardObjectFactory',
                'StateImprovementSuggestionService', 'StateInteractionStatsService',
                'StateObjectFactory', 'StatesObjectFactory', 'SuggestionsService',
                'SuggestionThreadObjectFactory', 'TextInputRulesService',
                'ThreadMessageObjectFactory', 'ThreadMessageSummaryObjectFactory',
                'ThreadStatusDisplayService', 'TranslationLanguageService',
                'UrlInterpolationService', 'UrlService', 'UserInfoObjectFactory',
                'UtilsService', 'ValidatorsService', 'WindowDimensionsService',
                'WindowRef'];
              for (let service of servicesToProvide) {
              // console.log(service, (
              //   service[0].toLowerCase() + service.substring(1)));
                $provide.value(service, (
                  service[0].toLowerCase() + service.substring(1)));
                // angular.module('oppia').factory(service, function() {
                //   return OppiaAngularRootComponent[service[0].toLowerCase() + service.substring(1)];
                // });
              }
            }]);
            console.log(Date.now() - start);
            $scope.initialized = true;
          };
        }]
    };
  }
]);
