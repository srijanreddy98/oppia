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
 * @fileoverview Unit tests for storyViewerNavbarBreadcrumb.
 */

import { EventEmitter } from '@angular/core';
import { importAllAngularServices } from 'tests/unit-test-utils';

describe('Story viewer navbar breadcrumb component', function() {
  var ctrl = null;
  var urlService = null;
  var storyViewerBackendApiService = null;
  var mockSendStoryDataEventEmitter = null;

  beforeEach(angular.mock.module('oppia'));
  importAllAngularServices();
  beforeEach(angular.mock.inject(function($injector, $componentController) {
    urlService = $injector.get('UrlService');
    storyViewerBackendApiService = $injector.get(
      'StoryViewerBackendApiService');

    spyOn(urlService, 'getTopicUrlFragmentFromLearnerUrl').and.returnValue(
      'topic1');
    spyOn(urlService, 'getClassroomUrlFragmentFromLearnerUrl').and.returnValue(
      'classroom1');
    mockSendStoryDataEventEmitter = new EventEmitter();
    spyOnProperty(
      storyViewerBackendApiService,
      'onSendStoryData').and.returnValue(mockSendStoryDataEventEmitter);

    ctrl = $componentController('storyViewerNavbarBreadcrumb', { });
    ctrl.$onInit();
  }));

  afterEach(() => {
    ctrl.$onDestroy();
  });

  it('should get topic url when story data is already loaded', function() {
    mockSendStoryDataEventEmitter.emit({
      topicName: 'topic_1',
      storyTitle: 'Story title'
    });

    expect(ctrl.getTopicUrl()).toBe('/learn/classroom1/topic1/story');
  });
});
