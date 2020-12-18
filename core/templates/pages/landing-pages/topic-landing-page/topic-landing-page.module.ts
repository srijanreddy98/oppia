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
 * @fileoverview Module for the topic landing page.
 */

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { downgradeComponent, UpgradeModule } from '@angular/upgrade/static';

import { OppiaAngularRootComponent } from
  'components/oppia-angular-root.component';
import { SharedComponentsModule } from 'components/shared-component.module';
import { TopicLandingPageComponent } from
  'pages/landing-pages/topic-landing-page/topic-landing-page.component';
import { RequestInterceptor } from 'services/request-interceptor.service';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedComponentsModule,
    UpgradeModule
  ],
  declarations: [
    OppiaAngularRootComponent,
    TopicLandingPageComponent
  ],
  entryComponents: [
    OppiaAngularRootComponent,
    TopicLandingPageComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ]
})
export class TopicLandingPageModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap(): void {
    this.upgrade.bootstrap(document.body, ['oppia'], { strictDi: true });
  }
}

declare var angular: ng.IAngularStatic;

angular.module('oppia').directive(
  // This directive is the downgraded version of the Angular component to
  // Bootstrap the application. the Angular 8.
  'oppiaAngularRoot',
  downgradeComponent({
    component: OppiaAngularRootComponent
  }) as angular.IDirectiveFactory);
