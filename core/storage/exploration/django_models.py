# coding: utf-8
#
# Copyright 2013 Google Inc. All Rights Reserved.
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

"""Model for an Oppia exploration."""

__author__ = 'Sean Lip'

from core import django_utils
import core.storage.base_model.models as base_models

from django.db import models

QUERY_LIMIT = 100


class ExplorationSnapshotMetadataModel(base_models.BaseSnapshotMetadataModel):
    """Storage model for the metadata for an exploration snapshot."""
    pass


class ExplorationSnapshotContentModel(base_models.BaseSnapshotContentModel):
    """Storage model for the content of an exploration snapshot."""
    pass


class ExplorationModel(base_models.VersionedModel):
    """Versioned storage model for an Oppia exploration.

    This class should only be imported by the exploration domain file, the
    exploration services file, and the Exploration model test file.
    """
    SNAPSHOT_METADATA_CLASS = ExplorationSnapshotMetadataModel
    SNAPSHOT_CONTENT_CLASS = ExplorationSnapshotContentModel
    ALLOW_REVERT = True

    # What this exploration is called.
    title = models.CharField(max_length=100)
    # The category this exploration belongs to.
    category = models.CharField(max_length=100)

    # The name of the initial state of this exploration.
    init_state_name = models.CharField(max_length=100)
    # A dict representing the states of this exploration. This dict should
    # not be empty.
    states = django_utils.JSONField(default={}, primitivelist=True)
    # The dict of parameter specifications associated with this exploration.
    # Each specification is a dict whose keys are param names and whose values
    # are each dicts with a single key, 'obj_type', whose value is a string.
    param_specs = django_utils.JSONField(
        blank=True, default={}, primitivelist=True)
    # The list of parameter changes to be performed once at the start of a
    # reader's encounter with an exploration.
    param_changes = django_utils.JSONField(
        blank=True, default=[], primitivelist=True)
    # The default HTML template to use for displaying the exploration to the
    # reader. This is a filename in data/skins (without the .html suffix).
    default_skin = models.CharField(max_length=100, default='conversation_v1')

    @classmethod
    def get_public_explorations(cls):
        """Returns an iterable containing publicly-available explorations."""
        public_rights_models = ExplorationRightsModel.objects.all().filter(
            status='public')
        exploration_ids = [model.id for model in public_rights_models]

        return [cls.get_by_id(eid) for eid in exploration_ids]

    @classmethod
    def get_exploration_count(cls):
        """Returns the total number of explorations."""
        return cls.objects.all().count()

    def put(self, committer_id, properties_dict, commit_message, commit_cmds):
        """Updates the exploration using the properties dict, then saves it."""
        if not isinstance(committer_id, basestring):
            raise Exception('Invalid committer id: %s' % committer_id)

        if properties_dict is None:
            properties_dict = {}

        for key in properties_dict:
            if key in self.attr_list():
                setattr(self, key, properties_dict[key])
            else:
                raise Exception(
                    'Invalid key for exploration properties dict: %s' % key)

        self.save(committer_id, commit_message, commit_cmds)


class ExplorationRightsSnapshotMetadataModel(
        base_models.BaseSnapshotMetadataModel):
    """Storage model for the metadata for an exploration rights snapshot."""
    pass


class ExplorationRightsSnapshotContentModel(
        base_models.BaseSnapshotContentModel):
    """Storage model for the content of an exploration rights snapshot."""
    pass


class ExplorationRightsModel(base_models.VersionedModel):
    """Storage model for rights related to an exploration.

    The id of each instance is the id of the corresponding exploration.
    """
    SNAPSHOT_METADATA_CLASS = ExplorationRightsSnapshotMetadataModel
    SNAPSHOT_CONTENT_CLASS = ExplorationRightsSnapshotContentModel
    ALLOW_REVERT = False

    # The user_ids of owners of this exploration.
    owner_ids = django_utils.ListField(default=[], blank=True)
    # The user_ids of users who are allowed to edit this exploration.
    editor_ids = django_utils.ListField(default=[], blank=True)
    # The user_ids of users who are allowed to view this exploration.
    viewer_ids = django_utils.ListField(default=[], blank=True)

    # Whether this exploration is owned by the community.
    community_owned = models.BooleanField(default=False)

    STATUS_CHOICES = (
        ('private', 'private'),
        ('public', 'public'),
        ('publicized', 'publicized')
    )

    # The publication status of this exploration.
    status = models.CharField(
        max_length=20, default='private', choices=STATUS_CHOICES
    )

    def put(self, committer_id, commit_message, commit_cmds):
        self.save(committer_id, commit_message, commit_cmds)
