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
 * @fileoverview Tests for Validator to check if input is integer.
 */

// TODO(#7222): Remove the following block of unnecessary imports once
// the code corresponding to the spec is upgraded to Angular 8.

import { importAllAngularServices } from 'tests/unit-test-utils';
// ^^^ This block is to be removed.

require('components/forms/validators/is-integer.filter.ts');

describe('Normalizer tests', function() {
  var filterName = 'isInteger';

  beforeEach(angular.mock.module('oppia'));

  importAllAngularServices();

  it('should have the relevant filters', angular.mock.inject(function($filter) {
    expect($filter(filterName)).not.toEqual(null);
  }));

  it('should validate integers', angular.mock.inject(function($filter) {
    var filter = $filter('isInteger');
    expect(filter('3')).toBe(true);
    expect(filter('-3')).toBe(true);
    expect(filter('3.0')).toBe(true);
    expect(filter('3.5')).toBe(false);
  }));
});
