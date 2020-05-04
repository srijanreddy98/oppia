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
 * @fileoverview Directive for a schema-based viewer for HTML.
 */

require('domain/utilities/url-interpolation.service.ts');

angular.module('oppia').directive('schemaBasedHtmlViewer', [function() {
  return {
    scope: {
      localValue: '='
    },
    template: require('./schema-based-html-viewer.directive.html'),
    restrict: 'E'
  };
}]);
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'schema-based-html-viewer'
})
export class SchemaBasedHtmlViewerDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('schemaBasedHtmlViewer', elementRef, injector);
  }
}
