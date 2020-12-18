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
 * @fileoverview File to import necessary scripts for get_started page.
 */

import 'core-js/es7/reflect';
import 'zone.js';

angular.module('oppia', [
  require('angular-cookies'), 'ngSanitize', 'pascalprecht.translate', 'toastr',
  'ui.bootstrap'
]);

// The module needs to be loaded directly after jquery since it defines the
// main module the elements are attached to.
require(
  'pages/pending-account-deletion-page/' +
  'pending-account-deletion-page.module.ts');
require('App.ts');
require('base-components/oppia-root.directive.ts');

require('base-components/base-content.directive.ts');
// Bootstrap the application.
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PendingAccountDeletionPageModule } from './pending-account-deletion-page.module';
platformBrowserDynamic().bootstrapModule(PendingAccountDeletionPageModule);
