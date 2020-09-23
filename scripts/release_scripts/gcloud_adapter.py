# Copyright 2019 The Oppia Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Module with GCloud-related functions."""

from __future__ import absolute_import  # pylint: disable=import-only-modules
from __future__ import unicode_literals  # pylint: disable=import-only-modules

import json
import os
import subprocess
import sys

from scripts import common

CURR_DIR = os.path.abspath(os.getcwd())
OPPIA_TOOLS_DIR = os.path.join(CURR_DIR, '..', 'oppia_tools')

if not os.path.exists(os.path.dirname(common.GOOGLE_APP_ENGINE_SDK_HOME)):
    raise Exception(
        'Directory %s does not exist.' % common.GOOGLE_APP_ENGINE_SDK_HOME)
sys.path.insert(0, common.GOOGLE_APP_ENGINE_SDK_HOME)


def require_gcloud_to_be_available():
    """Check whether gcloud is installed while undergoing deployment process."""
    try:
        p = subprocess.Popen(
            [common.GCLOUD_PATH, '--version'],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        _, stderr = p.communicate()
        if p.returncode != 0:
            raise Exception(stderr)
    except Exception:
        raise Exception(
            'gcloud required, but could not be found. Please run python -m '
            'scripts.start to install gcloud.')


def update_indexes(index_yaml_path, app_name):
    """Update indexes on the production server.

    Args:
        index_yaml_path: str. The path to the index.yaml file.
        app_name: str. The name of the GCloud project.
    """
    assert os.path.isfile(index_yaml_path), 'Missing indexes file.'
    subprocess.check_output([
        common.GCLOUD_PATH, '--quiet', 'datastore', 'indexes',
        'create', index_yaml_path, '--project=%s' % app_name])


def get_all_index_descriptions(app_name):
    """Obtains indexes uploaded on the server.

    Args:
        app_name: str. The name of the GCloud project.

    Returns:
        list. A list of dict of uploaded indexes.
    """
    listed_indexes = subprocess.check_output([
        common.GCLOUD_PATH, 'datastore', 'indexes', 'list',
        '--project=%s' % app_name, '--format=json'])
    return json.loads(listed_indexes)


def check_all_indexes_are_serving(app_name):
    """Checks that all indexes are serving.

    Args:
        app_name: str. The name of the GCloud project.

    Returns:
        bool. A boolean to indicate whenther all indexes are serving or not.
    """
    # all_indexes is a list of dict of indexes. The format of
    # each dict is as follows:
    # {
    #   "ancestor": "NONE",
    #   "indexId": "CICAgIDAiJ0K",
    #   "kind": "_AE_Pipeline_Record",
    #   "projectId": "test-oppia",
    #   "properties": [
    #     {
    #       "direction": "ASCENDING",
    #       "name": "is_root_pipeline"
    #     },
    #     {
    #       "direction": "DESCENDING",
    #       "name": "start_time"
    #     }
    #   ],
    #   "state": "READY"
    # }
    all_indexes = get_all_index_descriptions(app_name)
    return all(index['state'] == 'READY' for index in all_indexes)


def get_currently_served_version(app_name):
    """Retrieves the default version being served on the specified App Engine
    application.

    Args:
        app_name: str. The name of the GCloud project.

    Returns:
        str. The current serving version.
    """
    listed_versions = subprocess.check_output([
        common.GCLOUD_PATH, 'app', 'versions', 'list',
        '--hide-no-traffic', '--service=default', '--project=%s' % app_name])
    default_version_line_start_str = 'default  '
    listed_versions = listed_versions[
        listed_versions.index(default_version_line_start_str) + len(
            default_version_line_start_str):]
    return listed_versions[:listed_versions.index(' ')]


def get_latest_deployed_version(app_name, service_name):
    """Retrieves the latest version being served on the specified App Engine
    application and a specific service.

    Args:
        app_name: str. The name of the GCloud project.
        service_name: str. The name of the service for which version is
            to be fetched.

    Returns:
        str. The latest serving version.
    """
    listed_versions = json.loads(
        subprocess.check_output([
            common.GCLOUD_PATH, 'app', 'versions', 'list', '--format=json',
            '--service=%s' % service_name, '--project=%s' % app_name]))
    version_ids = [
        listed_version.get('id') for listed_version in listed_versions]
    version_ids.sort()
    return version_ids[-1]


def switch_version(app_name, version_to_switch_to):
    """Switches to the release version and migrates traffic to it.

    Args:
        app_name: str. The name of the GCloud project.
        version_to_switch_to: str. The version to switch to.
    """
    subprocess.check_output([
        common.GCLOUD_PATH, 'app', 'services', 'set-traffic',
        'default', '--splits', '%s=1' % version_to_switch_to,
        '--project=%s' % app_name])

    latest_admin_version = get_latest_deployed_version(
        app_name, 'cloud-datastore-admin')
    subprocess.check_output([
        common.GCLOUD_PATH, '--quiet', 'app', 'services', 'set-traffic',
        'cloud-datastore-admin', '--splits', '%s=1' % latest_admin_version,
        '--project=%s' % app_name])


def deploy_application(app_yaml_path, app_name, version=None):
    """Deploys the service corresponding to the given app.yaml path to GAE.

    Args:
        app_yaml_path: str. The path to the app.yaml file.
        app_name: str. The name of the GCloud project.
        version: str or None. If provided, the version to use.
    """
    args = [
        common.GCLOUD_PATH, '--quiet', 'app', 'deploy',
        app_yaml_path, '--no-promote', '--no-stop-previous-version',
        '--project=%s' % app_name]
    if version is not None:
        args.append('--version=%s' % version)
    subprocess.check_output(args)
