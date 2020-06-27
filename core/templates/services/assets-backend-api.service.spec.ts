// Copyright 2017 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for AssetsBackendApiService
 */

// TODO(#7222): Remove the following block of unnnecessary imports once
// AssetsBackendApiService.ts is upgraded to Angular 8.
import { AudioFileObjectFactory } from
  'domain/utilities/AudioFileObjectFactory';
import { FileDownloadRequestObjectFactory } from
  'domain/utilities/FileDownloadRequestObjectFactory';
import { ImageFileObjectFactory } from
  'domain/utilities/ImageFileObjectFactory';
import { UpgradedServices } from 'services/UpgradedServices';
// ^^^ This block is to be removed.
import { AssetsBackendApiService } from
  'services/assets-backend-api.service';
import { AppConstants } from 'app.constants';
import { HttpClientTestingModule, HttpTestingController } from
  '@angular/common/http/testing';
import { TestBed, fakeAsync, flushMicrotasks } from
  '@angular/core/testing';

// Jquery is needed in this file because some tests will spyOn Jquery methods.
// The spies won't actually spy Jquery methods without the import.
import $ from 'jquery';

require('domain/utilities/url-interpolation.service.ts');
require('services/assets-backend-api.service.ts');
require('services/csrf-token.service.ts');
const Constants = require('constants.ts');

fdescribe('Assets Backend API Service', () => {
  fdescribe('on dev mode', () => {
    var serviceInstance = null;
    var httpTestingController = null;
    var ENTITY_TYPE = null;
    var audioRequestUrl = null;
    var imageRequestUrl = null;
    const EXAMPLE_AUDIO = new Blob(['audio data'], {type: 'audioType'});

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      httpTestingController = TestBed.get(HttpTestingController);
      serviceInstance = TestBed.get(AssetsBackendApiService);
      ENTITY_TYPE = AppConstants.ENTITY_TYPE;
      audioRequestUrl = serviceInstance.urlInterpolationService.interpolateUrl(
        '/assetsdevhandler/exploration/<exploration_id>/assets/audio/' +
        '<filename>',
        {
          exploration_id: '0',
          filename: 'myfile.mp3'
        });

      imageRequestUrl = serviceInstance.urlInterpolationService.interpolateUrl(
        '/assetsdevhandler/exploration/<exploration_id>/assets/image/' +
        '<filename>',
        {
          exploration_id: '0',
          filename: 'myfile.png'
        });
    });

    afterEach(() => {
      httpTestingController.verify();
    });


    it('should correctly formulate the download URL for audio', () => {
      expect(
        serviceInstance.getAudioDownloadUrl(
          ENTITY_TYPE.EXPLORATION, 'expid12345', 'a.mp3')
      ).toEqual('/assetsdevhandler/exploration/expid12345/assets/audio/a.mp3');
    });

    it('should correctly formulate the preview URL for images', () => {
      expect(
        serviceInstance.getImageUrlForPreview(
          ENTITY_TYPE.EXPLORATION, 'expid12345', 'a.png')
      ).toEqual('/assetsdevhandler/exploration/expid12345/assets/image/a.png');
    });

    it('should correctly formulate the thumbnail url for preview', () => {
      expect(
        serviceInstance.getThumbnailUrlForPreview(
          ENTITY_TYPE.EXPLORATION, 'expid12345', 'thumbnail.png')).toEqual(
        '/assetsdevhandler/exploration/expid12345/assets/' +
        'thumbnail/thumbnail.png');
    });

    fit('should successfully fetch and cache audio', fakeAsync(() => {
      var successHandler = jasmine.createSpy('success');
      var failHandler = jasmine.createSpy('fail');
      // $httpBackend.expect('GET', audioRequestUrl).respond(201, 'audio data');
      expect(serviceInstance.isCached('myfile.mp3')).toBe(false);

      serviceInstance.loadAudio('0', 'myfile.mp3').then(
        successHandler, failHandler);
      var req = httpTestingController.expectOne(audioRequestUrl);
      expect(req.request.method).toEqual('GET');
      expect((serviceInstance.getAssetsFilesCurrentlyBeingRequested())
        .audio.length).toBe(1);
      req.flush(EXAMPLE_AUDIO);
      // $httpBackend.flush();
      flushMicrotasks();
      expect((serviceInstance.getAssetsFilesCurrentlyBeingRequested())
        .audio.length).toBe(0);
      expect(serviceInstance.isCached('myfile.mp3')).toBe(true);
      expect(successHandler).toHaveBeenCalled();
      expect(failHandler).not.toHaveBeenCalled();
      // $httpBackend.verifyNoOutstandingExpectation();
    }));

    it('should not fetch an audio if it is already cached', fakeAsync(() => {
      var successHandler = jasmine.createSpy('success');
      var failHandler = jasmine.createSpy('fail');

      // $httpBackend.expect('GET', audioRequestUrl).respond(201, 'audio data');
      expect(serviceInstance.isCached('myfile.mp3')).toBe(false);
      serviceInstance.loadAudio('0', 'myfile.mp3').then(
        successHandler, failHandler);
      var req = httpTestingController.expectOne(audioRequestUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(EXAMPLE_AUDIO);
      // $httpBackend.flush();
      flushMicrotasks();
      expect(serviceInstance.isCached('myfile.mp3')).toBe(true);
      expect(successHandler).toHaveBeenCalled();
      expect(failHandler).not.toHaveBeenCalled();
      // $httpBackend.verifyNoOutstandingExpectation();

      serviceInstance.loadAudio('0', 'myfile.mp3').then(
        (cachedFile) => {
          expect(cachedFile).toEqual(
            serviceInstance.audioFileObjectFactory.createNew(
              'myfile.mp3',
              EXAMPLE_AUDIO
            )
          );
        });
      // $httpBackend.verifyNoOutstandingExpectation();
    }));

    // TODO Remove this DEBUG code
    fit('should DEBUG', fakeAsync(() => {
      serviceInstance.debug();
      var req = httpTestingController.expectOne('/debug');
      expect(req.request.method).toEqual('GET');
      req.error();
    }));

    it('should handler rejection when fetching a file fails', fakeAsync(() => {
      var successHandler = jasmine.createSpy('success');
      var failHandler = jasmine.createSpy('fail');

      // $httpBackend.expect('GET', audioRequestUrl).respond(
      //  500, 'File not found.');
      expect(serviceInstance.isCached('myfile.mp3')).toBe(false);

      serviceInstance.loadAudio('0', 'myfile.mp3').then(
        successHandler, failHandler);
      var req = httpTestingController.expectOne(audioRequestUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(
        'File not found.',
        {
          status: 500,
          statusText: 'Internal Server Error',
        }
      );
      // $httpBackend.flush();
      expect(successHandler).not.toHaveBeenCalled();
      expect(failHandler).toHaveBeenCalledWith('myfile.mp3');
      expect(serviceInstance.isCached('myfile.mp3')).toBe(false);
      // $httpBackend.verifyNoOutstandingExpectation();
    }));

    it('should successfully save an audio', (done) => {
      var successMessage = 'Audio was successfully saved.';
      // @ts-ignore in order to ignore JQuery properties that should
      // be declarated.
      spyOn($, 'ajax').and.callFake(() => {
        var d = $.Deferred();
        d.resolve(successMessage);
        return d.promise();
      });

      serviceInstance.saveAudio('0', 'a.mp3', new File([], 'a.mp3'))
        .then((response) => {
          expect(response).toBe(successMessage);
        }).then(done, done.fail);

      // $q Promises need to be forcibly resolved through a JavaScript digest,
      // which is what $apply helps kick-start.
      // $rootScope.$apply();
    });

    it('should handle rejection when saving a file fails', (done) => {
      var errorMessage = 'Error on saving audio';
      // @ts-ignore in order to ignore JQuery properties that should
      // be declarated.
      spyOn($, 'ajax').and.callFake(() => {
        var d = $.Deferred();
        d.reject({
          // responseText contains a XSSI Prefix, which is represented by )]}'
          // string. That's why double quotes is being used here. It's not
          // possible to use \' instead of ' so the XSSI Prefix won't be
          // evaluated correctly.
          /* eslint-disable quotes */
          responseText: ")]}'\n{ \"message\": \"" + errorMessage + "\" }"
          /* eslint-enable quotes */
        });
        return d.promise();
      });

      serviceInstance.saveAudio('0', 'a.mp3', new File([], 'a.mp3'))
        .then(done, (response) => {
          expect(response).toEqual({
            message: errorMessage
          });
          done();
        });

      // $q Promises need to be forcibly resolved through a JavaScript digest,
      // which is what $apply helps kick-start.
      // $rootScope.$apply();
    });

    it('should successfully fetch and cache image', () => {
      var successHandler = jasmine.createSpy('success');
      var failHandler = jasmine.createSpy('fail');

      $httpBackend.expect('GET', imageRequestUrl).respond(201, 'image data');
      expect(serviceInstance.isCached('myfile.png')).toBe(false);

      serviceInstance.loadImage(
        ENTITY_TYPE.EXPLORATION, '0', 'myfile.png').then(
        successHandler, failHandler);
      expect((serviceInstance.getAssetsFilesCurrentlyBeingRequested())
        .image.length).toBe(1);
      $httpBackend.flush();
      expect((serviceInstance.getAssetsFilesCurrentlyBeingRequested())
        .image.length).toBe(0);
      expect(serviceInstance.isCached('myfile.png')).toBe(true);
      expect(successHandler).toHaveBeenCalled();
      expect(failHandler).not.toHaveBeenCalled();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should not fetch an image if it is already cached', () => {
      var successHandler = jasmine.createSpy('success');
      var failHandler = jasmine.createSpy('fail');

      $httpBackend.expect('GET', imageRequestUrl).respond(201, 'image data');
      expect(serviceInstance.isCached('myfile.png')).toBe(false);

      serviceInstance.loadImage(
        ENTITY_TYPE.EXPLORATION, '0', 'myfile.png').then(
        successHandler, failHandler);
      $httpBackend.flush();
      expect(serviceInstance.isCached('myfile.png')).toBe(true);
      expect(successHandler).toHaveBeenCalled();
      expect(failHandler).not.toHaveBeenCalled();
      $httpBackend.verifyNoOutstandingExpectation();

      serviceInstance.loadImage(
        ENTITY_TYPE.EXPLORATION, '0', 'myfile.png').then(
        (cachedFile) => {
          expect(cachedFile).toEqual(imageFileObjectFactory.createNew(
            'myfile.png',
            new Blob()
          ));
        });
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should call the provided failure handler on HTTP failure for an audio',
      () => {
        var successHandler = jasmine.createSpy('success');
        var failHandler = jasmine.createSpy('fail');

        $httpBackend.expect('GET', audioRequestUrl).respond(
          500, 'MutagenError');
        serviceInstance.loadAudio('0', 'myfile.mp3').then(
          successHandler, failHandler);
        $httpBackend.flush();

        expect(successHandler).not.toHaveBeenCalled();
        expect(failHandler).toHaveBeenCalled();
        $httpBackend.verifyNoOutstandingExpectation();
      });

    it('should call the provided failure handler on HTTP failure for an image',
      () => {
        var successHandler = jasmine.createSpy('success');
        var failHandler = jasmine.createSpy('fail');

        $httpBackend.expect('GET', imageRequestUrl).respond(500, 'Error');
        serviceInstance.loadImage(
          ENTITY_TYPE.EXPLORATION, '0', 'myfile.png').then(
          successHandler, failHandler);
        $httpBackend.flush();

        expect(successHandler).not.toHaveBeenCalled();
        expect(failHandler).toHaveBeenCalled();
        $httpBackend.verifyNoOutstandingExpectation();
      });

    it('should successfully abort the download of all the audio files',
      () => {
        var successHandler = jasmine.createSpy('success');
        var failHandler = jasmine.createSpy('fail');

        $httpBackend.expect('GET', audioRequestUrl).respond(201, 'audio data');

        serviceInstance.loadAudio('0', 'myfile.mp3').then(
          successHandler, failHandler);

        expect(serviceInstance.getAssetsFilesCurrentlyBeingRequested()
          .audio.length).toBe(1);

        serviceInstance.abortAllCurrentAudioDownloads();
        $httpBackend.verifyNoOutstandingRequest();
        expect(serviceInstance.getAssetsFilesCurrentlyBeingRequested()
          .audio.length).toBe(0);
        expect(serviceInstance.isCached('myfile.mp3')).toBe(false);
      });

    it('should successfully abort the download of the all the image files',
      () => {
        var successHandler = jasmine.createSpy('success');
        var failHandler = jasmine.createSpy('fail');

        $httpBackend.expect('GET', imageRequestUrl).respond(201, 'image data');

        serviceInstance.loadImage(
          ENTITY_TYPE.EXPLORATION, '0', 'myfile.png').then(
          successHandler, failHandler);

        expect(serviceInstance.getAssetsFilesCurrentlyBeingRequested()
          .image.length).toBe(1);

        serviceInstance.abortAllCurrentImageDownloads();
        $httpBackend.verifyNoOutstandingRequest();
        expect(serviceInstance.getAssetsFilesCurrentlyBeingRequested()
          .image.length).toBe(0);
        expect(serviceInstance.isCached('myfile.png')).toBe(false);
      });

    it('should use the correct blob type for audio assets', () => {
      var successHandler = jasmine.createSpy('success');
      var failHandler = jasmine.createSpy('fail');

      $httpBackend.expect('GET', audioRequestUrl).respond(
        201, {type: 'audio/mpeg'});
      serviceInstance.loadAudio('0', 'myfile.mp3').then(
        successHandler, failHandler);
      expect((serviceInstance.getAssetsFilesCurrentlyBeingRequested())
        .audio.length).toBe(1);
      $httpBackend.flush();
      expect((serviceInstance.getAssetsFilesCurrentlyBeingRequested())
        .audio.length).toBe(0);

      expect(successHandler).toHaveBeenCalled();
      expect(failHandler).not.toHaveBeenCalled();
      expect(successHandler.calls.first().args[0].data.type).toBe('audio/mpeg');
      $httpBackend.verifyNoOutstandingExpectation();
    });
  });

  describe('without dev mode settings', () => {
    beforeEach(angular.mock.module('oppia'));
    beforeEach(angular.mock.module('oppia', ($provide) => {
      $provide.value('AudioFileObjectFactory', new AudioFileObjectFactory());
      $provide.value(
        'FileDownloadRequestObjectFactory',
        new FileDownloadRequestObjectFactory());
      $provide.value('ImageFileObjectFactory', new ImageFileObjectFactory());
      $provide.constant('DEV_MODE', false);
      $provide.constant('GCS_RESOURCE_BUCKET_NAME', false);
    }));
    beforeEach(angular.mock.module('oppia', ($provide) => {
      var ugs = new UpgradedServices();
      for (let [key, value] of Object.entries(ugs.getUpgradedServices())) {
        $provide.value(key, value);
      }
    }));

    it('should throw an error when is not on dev mode and Google Cloud' +
      ' Service bucket name is not set', angular.mock.inject(
      ($injector) => {
        expect(() => {
          var service = $injector.get(
            'AssetsBackendApiService');
        }).toThrowError('GCS_RESOURCE_BUCKET_NAME is not set in prod.');
      }));
  });

  describe('on production mode', () => {
    var serviceInstance = null;
    var httpTestingController = null;
    var ENTITY_TYPE = null;
    var gcsPrefix = 'https://storage.googleapis.com/None-resources';
    var oldDevMode = null;

    beforeAll(() => {
      oldDevMode = Constants.DEV_MODE;
      Constants.DEV_MODE = false;
    });

    afterAll(() => {
      Constants.DEV_MODE = oldDevMode;
    });

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AssetsBackendApiService]
      });
      httpTestingController = TestBed.get(HttpTestingController);
      serviceInstance = TestBed.get(AssetsBackendApiService);
      ENTITY_TYPE = AppConstants.ENTITY_TYPE;
    });

    it('should correctly formulate the download URL for audios', () => {
      expect(
        serviceInstance.getAudioDownloadUrl(
          ENTITY_TYPE.EXPLORATION, 'expid12345', 'a.mp3')
      ).toEqual(gcsPrefix +
        '/exploration/expid12345/assets/audio/a.mp3');
    });

    it('should correctly formulate the preview URL for images', () => {
      expect(
        serviceInstance.getImageUrlForPreview(
          ENTITY_TYPE.EXPLORATION, 'expid12345', 'a.png')
      ).toEqual(gcsPrefix + '/exploration/expid12345/assets/image/a.png');
    });

    it('should correctly formulate the thumbnail url for preview', () => {
      expect(
        serviceInstance.getThumbnailUrlForPreview(
          ENTITY_TYPE.EXPLORATION, 'expid12345', 'thumbnail.png')
      ).toEqual(gcsPrefix +
        '/exploration/expid12345/assets/thumbnail/thumbnail.png');
    });

    afterEach(() => {
      httpTestingController.verify();
    });
  });
});
