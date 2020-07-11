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
  'AdminBackendApiService', 'AdminDataService', 'AdminRouterService',
  'AdminTaskManagerService', 'AlertsService',
  'AlgebraicExpressionInputRulesService',
  'AlgebraicExpressionInputValidationService', 'AngularNameService',
  'AnswerClassificationResultObjectFactory', 'AnswerClassificationService',
  'AnswerGroupObjectFactory', 'AnswerGroupsCacheService',
  'AnswerStatsObjectFactory', 'AppService', 'AudioBarStatusService',
  'AudioFileObjectFactory', 'AudioLanguageObjectFactory',
  'AudioTranslationLanguageService', 'AudioTranslationManagerService',
  'AutogeneratedAudioLanguageObjectFactory', 'AutogeneratedAudioPlayerService',
  'AutoplayedVideosService', 'BackgroundMaskService',
  'BottomNavbarStatusService', 'BrowserCheckerService',
  'CamelCaseToHyphensPipe', 'ChangeObjectFactory', 'ClassifierObjectFactory',
  'ClassroomBackendApiService', 'CodeNormalizerService',
  'CodeReplPredictionService', 'CodeReplRulesService',
  'CodeReplValidationService', 'CollectionCreationBackendService',
  'CollectionCreationService', 'CollectionNodeObjectFactory',
  'CollectionObjectFactory', 'CollectionPlaythroughObjectFactory',
  'CollectionRightsBackendApiService', 'CollectionRightsObjectFactory',
  'CollectionValidationService', 'ComputationDataObjectFactory',
  'ComputeGraphService', 'ConceptCardBackendApiService',
  'ConceptCardObjectFactory', 'ConstructTranslationIdsService',
  'ContextService', 'ContinueRulesService', 'ContinueValidationService',
  'ContributionOpportunitiesBackendApiService', 'CountVectorizerService',
  'CreatorDashboardBackendApiService', 'CsrfTokenService',
  'CurrentInteractionService', 'DateTimeFormatService', 'DebouncerService',
  'DeviceInfoService', 'DocumentAttributeCustomizationService',
  'DragAndDropSortInputRulesService', 'DragAndDropSortInputValidationService',
  'EditabilityService', 'EditableCollectionBackendApiService',
  'EditorFirstTimeEventsService', 'EmailDashboardBackendApiService',
  'EmailDashboardDataService', 'EmailDashboardQueryObjectFactory',
  'EmailDashboardQueryResultsObjectFactory', 'EndExplorationRulesService',
  'EndExplorationValidationService', 'EntityContextObjectFactory',
  'ExplorationDiffService', 'ExplorationDraftObjectFactory',
  'ExplorationFeaturesBackendApiService', 'ExplorationFeaturesService',
  'ExplorationHtmlFormatterService', 'ExplorationImprovementsBackendApiService',
  'ExplorationMetadataObjectFactory', 'ExplorationObjectFactory',
  'ExplorationOpportunitySummaryObjectFactory',
  'ExplorationPermissionsBackendApiService',
  'ExplorationPermissionsObjectFactory',
  'ExplorationRecommendationsBackendApiService',
  'ExplorationRecommendationsService', 'ExplorationStats',
  'ExplorationStatsBackendApiService', 'ExplorationStatsObjectFactory',
  'ExplorationStatsService', 'ExplorationSummaryObjectFactory',
  'ExplorationTaskObjectFactory', 'ExpressionParserService',
  'ExpressionSyntaxTreeService', 'ExtensionTagAssemblerService',
  'ExtractImageFilenamesFromStateService',
  'FeaturedTranslationLanguageObjectFactory',
  'FeedbackMessageSummaryObjectFactory', 'FeedbackThreadObjectFactory',
  'FeedbackThreadSummaryObjectFactory', 'FileDownloadRequestObjectFactory',
  'FormatTimePipe', 'FractionInputRulesService',
  'FractionInputValidationService', 'FractionObjectFactory',
  'GenerateContentIdService', 'GraphDetailService', 'GraphInputRulesService',
  'GraphInputValidationService', 'GraphUtilsService',
  'GuestCollectionProgressObjectFactory', 'GuestCollectionProgressService',
  'GuppyConfigurationService', 'GuppyInitializationService',
  'HighBounceRateTaskObjectFactory', 'HintObjectFactory', 'HtmlEscaperService',
  'I18nLanguageCodeService', 'IdGenerationService',
  'ImageClickInputRulesService', 'ImageClickInputValidationService',
  'ImageFileObjectFactory', 'ImprovementActionButtonObjectFactory',
  'ImprovementsBackendApiService', 'ImprovementsService',
  'IneffectiveFeedbackLoopTaskObjectFactory', 'InteractionDetailsCacheService',
  'InteractionObjectFactory', 'InteractionRulesRegistryService',
  'InteractionSpecsService', 'InteractiveMapRulesService',
  'InteractiveMapValidationService', 'ItemSelectionInputRulesService',
  'ItemSelectionInputValidationService', 'JobDataObjectFactory',
  'JobStatusSummaryObjectFactory', 'JobStausSummaryObjectFactory',
  'LanguageUtilService', 'LearnerActionObjectFactory',
  'LearnerAnswerDetailsBackendApiService', 'LearnerAnswerDetailsObjectFactory',
  'LearnerAnswerInfoObjectFactory', 'LearnerDashboardActivityIdsObjectFactory',
  'LearnerDashboardBackendApiService', 'LearnerDashboardIdsBackendApiService',
  'LearnerParamsService', 'LoaderService', 'LocalStorageService',
  'LoggerService', 'LogicProofRulesService', 'LogicProofValidationService',
  'LostChangeObjectFactory', 'MathEquationInputRulesService',
  'MathEquationInputValidationService', 'MathExpressionInputRulesService',
  'MathExpressionInputValidationService', 'MathInteractionsService',
  'MessengerService', 'MetaTagCustomizationService',
  'MisconceptionObjectFactory', 'MultipleChoiceInputRulesService',
  'MultipleChoiceInputValidationService', 'MusicNotesInputRulesService',
  'MusicNotesInputValidationService', 'MusicPhrasePlayerService',
  'NeedsGuidingResponsesTaskObjectFactory', 'NewlyCreatedTopicObjectFactory',
  'NormalizeWhitespacePipe', 'NormalizeWhitespacePunctuationAndCasePipe',
  'NumberAttemptsService', 'NumberWithUnitsObjectFactory',
  'NumberWithUnitsRulesService', 'NumberWithUnitsValidationService',
  'NumericInputRulesService', 'NumericInputValidationService',
  'OutcomeObjectFactory', 'PageTitleService', 'ParamChangeObjectFactory',
  'ParamChangesObjectFactory', 'ParamMetadataObjectFactory',
  'ParamSpecObjectFactory', 'ParamSpecsObjectFactory', 'ParamTypeObjectFactory',
  'PencilCodeEditorRulesService', 'PencilCodeEditorValidationService',
  'PlayerCorrectnessFeedbackEnabledService', 'PlayerPositionService',
  'PlayerTranscriptService', 'PlaythroughBackendApiService',
  'PlaythroughIssueObjectFactory', 'PlaythroughIssuesBackendApiService',
  'PlaythroughObjectFactory', 'PlaythroughService',
  'PredictionAlgorithmRegistryService', 'PredictionResultObjectFactory',
  'PretestQuestionBackendApiService', 'ProfilePageBackendApiService',
  'PythonProgramTokenizer', 'PythonProgramTokenizers',
  'QuestionBackendApiService', 'QuestionSummaryForOneSkillObjectFactory',
  'QuestionSummaryObjectFactory', 'RatingComputationService',
  'ReadOnlyCollectionBackendApiService', 'ReadOnlyStoryNodeObjectFactory',
  'ReadOnlySubtopicPageObjectFactory', 'ReadOnlyTopicObjectFactory',
  'RecordedVoiceoversObjectFactory', 'ReviewTestBackendApiService',
  'ReviewTestEngineService', 'RubricObjectFactory', 'RuleObjectFactory',
  'SVMPredictionService', 'SchemaDefaultValueService',
  'SchemaUndefinedLastElementService', 'SearchExplorationsBackendApiService',
  'SetInputRulesService', 'SetInputValidationService', 'SidebarStatusService',
  'SiteAnalyticsService', 'SkillCreationBackendApiService',
  'SkillDifficultyObjectFactory', 'SkillMasteryBackendApiService',
  'SkillMasteryObjectFactory', 'SkillObjectFactory',
  'SkillOpportunityObjectFactory', 'SkillRightsBackendApiService',
  'SkillRightsObjectFactory', 'SkillSummaryObjectFactory',
  'SolutionObjectFactory', 'SolutionValidityService',
  'SpeechSynthesisChunkerService', 'StateCardObjectFactory',
  'StateClassifierMappingService', 'StateContentService',
  'StateCustomizationArgsService', 'StateEditorService',
  'StateGraphLayoutService', 'StateHintsService',
  'StateImprovementSuggestionService', 'StateInteractionIdService',
  'StateInteractionStatsBackendApiService', 'StateInteractionStatsService',
  'StateNameService', 'StateObjectFactory', 'StateParamChangesService',
  'StatePropertyService', 'StateRecordedVoiceoversService',
  'StateSolicitAnswerDetailsService', 'StateSolutionService',
  'StateStatsObjectFactory', 'StateTopAnswersStatsBackendApiService',
  'StateWrittenTranslationsService', 'StatesObjectFactory',
  'StatsReportingBackendApiService', 'StatsReportingService',
  'StopwatchObjectFactory', 'StoryContentsObjectFactory',
  'StoryNodeObjectFactory', 'StoryObjectFactory',
  'StoryPlaythroughObjectFactory', 'StoryReferenceObjectFactory',
  'StorySummaryObjectFactory', 'StoryViewerBackendApiService',
  'SubtitledHtmlObjectFactory', 'SubtopicObjectFactory',
  'SubtopicPageContentsObjectFactory', 'SubtopicPageObjectFactory',
  'SubtopicViewerBackendApiService',
  'SuccessiveIncorrectAnswersTaskObjectFactory', 'SuggestionModalService',
  'SuggestionObjectFactory', 'SuggestionThreadObjectFactory',
  'SuggestionsService', 'TaskEntryObjectFactory', 'TextInputPredictionService',
  'TextInputRulesService', 'TextInputTokenizer', 'TextInputValidationService',
  'ThreadMessageObjectFactory', 'ThreadMessageSummaryObjectFactory',
  'ThreadStatusDisplayService', 'TopicCreationBackendApiService',
  'TopicObjectFactory', 'TopicRightsObjectFactory', 'TopicSummaryObjectFactory',
  'TopicViewerBackendApiService', 'TopicsAndSkillsDashboardBackendApiService',
  'TopicsAndSkillsDashboardFilterObjectFactory',
  'TopicsAndSkillsDashboardPageService', 'TranslateService',
  'TranslationsBackendApiService', 'UnitsObjectFactory',
  'UrlInterpolationService', 'UrlService', 'UserExplorationPermissionsService',
  'UserInfoObjectFactory', 'UtilsService', 'ValidatorsService',
  'VersionTreeService', 'VisualizationInfoObjectFactory',
  'VoiceoverObjectFactory', 'WindowDimensionsService', 'WindowRef',
  'WinnowingPreprocessingService', 'WorkedExampleObjectFactory',
  'WrittenTranslationObjectFactory', 'WrittenTranslationsObjectFactory',
  'baseInteractionValidationService'
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
            const translateService = (
              OppiaAngularRootComponent.translateService);
            const i18nLanguageCodeService = (
              OppiaAngularRootComponent.i18nLanguageCodeService);
            translateService.use(
              i18nLanguageCodeService.getCurrentI18nLanguageCode());
            i18nLanguageCodeService.onI18nLanguageCodeChange.subscribe(
              (code) => translateService.use(code)
            );

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
