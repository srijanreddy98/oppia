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

// In case of doubts over what is done here, please look at the description of
// the PR #9479. https://github.com/oppia/oppia/pull/9479#issue-432536289

import { OppiaAngularRootComponent } from
  'components/oppia-angular-root.component';
import { IModule } from 'angular';

// Creating an interface that extends IModule and has an extra field called
// provideValueAfterBootstrap. This is a function that will be used to provide
// angular services to ajs after the ajs app and the angular app bootstrap
// themselves respectively.
interface CustomOppiaModule extends IModule {
  provideValueAfterBootstrap: Function;
}

export const ANGULAR_SERVICES = [
  'AdminDataService', 'AdminRouterService', 'AdminTaskManagerService',
  'AlertsService', 'AngularNameService',
  'AnswerClassificationResultObjectFactory', 'AnswerClassificationService',
  'AnswerGroupsCacheService', 'AnswerGroupObjectFactory',
  'AnswerStatsObjectFactory', 'AppService', 'AudioBarStatusService',
  'AudioFileObjectFactory', 'AudioLanguageObjectFactory',
  'AudioTranslationLanguageService', 'AudioTranslationManagerService',
  'AutogeneratedAudioLanguageObjectFactory', 'AutogeneratedAudioPlayerService',
  'AutoplayedVideosService', 'BackgroundMaskService',
  'baseInteractionValidationService', 'BrowserCheckerService',
  'CamelCaseToHyphensPipe', 'ChangeObjectFactory', 'ClassifierObjectFactory',
  'ClassroomBackendApiService', 'CodeNormalizerService',
  'CodeReplPredictionService', 'CodeReplRulesService',
  'CodeReplValidationService', 'CollectionCreationBackendService',
  'CollectionCreationService', 'CollectionNodeObjectFactory',
  'CollectionObjectFactory', 'CollectionPlaythroughObjectFactory',
  'CollectionRightsBackendApiService', 'CollectionRightsObjectFactory',
  'CollectionValidationService', 'ComputeGraphService',
  'ConceptCardBackendApiService', 'ConceptCardObjectFactory', 'ContextService',
  'ContinueValidationService', 'ContributionOpportunitiesBackendApiService',
  'ConstructTranslationIdsService', 'CountVectorizerService',
  'CreatorDashboardBackendApiService', 'CsrfTokenService',
  'CurrentInteractionService', 'DateTimeFormatService', 'DebouncerService',
  'DeviceInfoService', 'DocumentAttributeCustomizationService',
  'DragAndDropSortInputRulesService', 'DragAndDropSortInputValidationService',
  'EditableCollectionBackendApiService', 'EditabilityService',
  'EditorFirstTimeEventsService', 'EndExplorationValidationService',
  'EmailDashboardDataService', 'EntityContextObjectFactory',
  'ExplorationDiffService', 'ExplorationDraftObjectFactory',
  'ExplorationFeaturesBackendApiService', 'ExplorationFeaturesService',
  'ExplorationHtmlFormatterService', 'ExplorationMetadataObjectFactory',
  'ExplorationObjectFactory', 'ExplorationOpportunitySummaryObjectFactory',
  'ExplorationStatsBackendApiService', 'ExplorationStatsObjectFactory',
  'ExplorationStatsService', 'ExpressionParserService',
  'ExplorationRecommendationsService', 'ExpressionSyntaxTreeService',
  'ExtensionTagAssemblerService', 'ExtractImageFilenamesFromStateService',
  'FeedbackMessageSummaryObjectFactory', 'FeedbackThreadObjectFactory',
  'FeedbackThreadSummaryObjectFactory', 'FileDownloadRequestObjectFactory',
  'FractionInputValidationService', 'FractionObjectFactory',
  'GenerateContentIdService', 'GraphDetailService',
  'GraphInputValidationService', 'GraphUtilsService',
  'GuestCollectionProgressObjectFactory', 'GuestCollectionProgressService',
  'HighBounceRateTaskObjectFactory', 'HintObjectFactory', 'HtmlEscaperService',
  'I18nLanguageCodeService', 'IdGenerationService',
  'ImageClickInputValidationService', 'ImageFileObjectFactory',
  'ImprovementActionButtonObjectFactory', 'ImprovementsService',
  'InteractionDetailsCacheService', 'InteractionObjectFactory',
  'InteractionRulesRegistryService', 'InteractionSpecsService',
  'InteractiveMapValidationService', 'ItemSelectionInputValidationService',
  'LanguageUtilService', 'LearnerActionObjectFactory',
  'LearnerAnswerDetailsBackendApiService', 'LearnerAnswerDetailsObjectFactory',
  'LearnerAnswerInfoObjectFactory', 'LearnerDashboardActivityIdsObjectFactory',
  'LearnerDashboardBackendApiService', 'LearnerDashboardIdsBackendApiService',
  'LearnerParamsService', 'LocalStorageService', 'LoaderService',
  'LoggerService', 'LogicProofValidationService', 'LostChangeObjectFactory',
  'MathExpressionInputValidationService', 'MessengerService',
  'MetaTagCustomizationService', 'MisconceptionObjectFactory',
  'MultipleChoiceInputValidationService', 'MusicNotesInputValidationService',
  'MusicPhrasePlayerService', 'NewlyCreatedTopicObjectFactory',
  'NormalizeWhitespacePipe', 'NormalizeWhitespacePunctuationAndCasePipe',
  'NumberAttemptsService', 'NumericInputValidationService',
  'NumberWithUnitsObjectFactory', 'NumberWithUnitsValidationService',
  'OutcomeObjectFactory', 'PageTitleService', 'ParamChangeObjectFactory',
  'ParamChangesObjectFactory', 'ParamMetadataObjectFactory',
  'ParamSpecObjectFactory', 'ParamSpecsObjectFactory', 'ParamTypeObjectFactory',
  'PencilCodeEditorRulesService', 'PencilCodeEditorValidationService',
  'PlayerCorrectnessFeedbackEnabledService', 'PlayerPositionService',
  'PlayerTranscriptService', 'PlaythroughIssueObjectFactory',
  'PlaythroughIssuesBackendApiService', 'PlaythroughObjectFactory',
  'PlaythroughService', 'PredictionAlgorithmRegistryService',
  'PredictionResultObjectFactory', 'PretestQuestionBackendApiService',
  'ProfilePageBackendApiService', 'PythonProgramTokenizer',
  'QuestionBackendApiService', 'QuestionCreationService',
  'QuestionSummaryForOneSkillObjectFactory', 'QuestionSummaryObjectFactory',
  'RatingComputationService', 'ReadOnlyCollectionBackendApiService',
  'ReadOnlyStoryNodeObjectFactory', 'ReadOnlySubtopicPageObjectFactory',
  'ReadOnlyTopicObjectFactory', 'RecordedVoiceoversObjectFactory',
  'ReviewTestBackendApiService', 'ReviewTestEngineService',
  'RubricObjectFactory', 'RuleObjectFactory', 'SchemaDefaultValueService',
  'SchemaUndefinedLastElementService', 'SearchExplorationsBackendApiService',
  'SetInputValidationService', 'SVMPredictionService', 'SidebarStatusService',
  'SiteAnalyticsService', 'SkillCreationBackendApiService',
  'SkillDifficultyObjectFactory', 'SkillMasteryBackendApiService',
  'SkillObjectFactory', 'SkillOpportunityObjectFactory',
  'SkillRightsBackendApiService', 'SkillRightsObjectFactory',
  'SkillSummaryObjectFactory', 'SolutionObjectFactory',
  'SolutionValidityService', 'SpeechSynthesisChunkerService',
  'StateCardObjectFactory', 'StateClassifierMappingService',
  'StateContentService', 'StateCustomizationArgsService', 'StateEditorService',
  'StateGraphLayoutService', 'StateHintsService',
  'StateImprovementSuggestionService', 'StateInteractionIdService',
  'StateInteractionStatsService', 'StateNameService', 'StateObjectFactory',
  'StateParamChangesService', 'StatePropertyService',
  'StateRecordedVoiceoversService', 'StateSolicitAnswerDetailsService',
  'StateSolutionService', 'StateStatsObjectFactory',
  'StateTopAnswersStatsBackendApiService', 'StateWrittenTranslationsService',
  'StatesObjectFactory', 'StatsReportingService', 'StopwatchObjectFactory',
  'StoryContentsObjectFactory', 'StoryNodeObjectFactory', 'StoryObjectFactory',
  'StoryPlaythroughObjectFactory', 'StoryReferenceObjectFactory',
  'StorySummaryObjectFactory', 'StoryViewerBackendApiService',
  'SubtitledHtmlObjectFactory', 'SubtopicObjectFactory',
  'SubtopicPageContentsObjectFactory', 'SubtopicPageObjectFactory',
  'SubtopicViewerBackendApiService', 'SuggestionModalService',
  'SuggestionObjectFactory', 'SuggestionThreadObjectFactory',
  'SuggestionsService', 'TaskEntryObjectFactory', 'TextInputPredictionService',
  'TextInputRulesService', 'TextInputTokenizer', 'TextInputValidationService',
  'ThreadMessageObjectFactory', 'ThreadMessageSummaryObjectFactory',
  'ThreadStatusDisplayService', 'TopicCreationBackendApiService',
  'TopicObjectFactory', 'TopicRightsObjectFactory',
  'TopicsAndSkillsDashboardBackendApiService', 'TopicSummaryObjectFactory',
  'TopicsAndSkillsDashboardFilterObjectFactory',
  'TopicsAndSkillsDashboardPageService', 'TopicViewerBackendApiService',
  'UnitsObjectFactory', 'UrlInterpolationService', 'UrlService',
  'UserExplorationPermissionsService', 'UserInfoObjectFactory', 'UtilsService',
  'ValidatorsService', 'VersionTreeService', 'VoiceoverObjectFactory',
  'WindowDimensionsService', 'WindowRef', 'WinnowingPreprocessingService',
  'WorkedExampleObjectFactory', 'WrittenTranslationObjectFactory'
];

angular.module('oppia').directive('oppiaRoot', [
  function() {
    return {
      template: require('./oppia-root.directive.html'),
      scope: {},
      transclude: true,
      controllerAs: '$ctrl',
      controller: ['$scope',
        function($scope) {
          $scope.initialized = false;

          $scope.onInit = function() {
            for (let service of ANGULAR_SERVICES) {
              (
                angular.module(
                  'oppia') as CustomOppiaModule).provideValueAfterBootstrap(
                service, OppiaAngularRootComponent[(
                  service[0].toLowerCase() + service.substring(1))]);
            }
            // The next line allows the transcluded content to start executing.
            $scope.initialized = true;
          };
        }]
    };
  }
]);
