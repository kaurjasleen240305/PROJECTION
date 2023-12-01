from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl import fields
from elasticsearch_dsl.connections import connections
from .models import Project,List,Card,User
from django_elasticsearch_dsl.registries import registry
from elasticsearch import Elasticsearch



@registry.register_document
class UserDocument(Document):
    # project_name = Text()
    class Index:
        # Name of the Elasticsearch index
        name = 'users'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = User # The model associated with this Document
        fields=['username']
        pk_field = 'username'


@registry.register_document
class ProjectDocument(Document):
    # project_name = Text()
    project_members=fields.Nested(UserDocument)
    creator=fields.Nested(UserDocument)
    class Index:
        # Name of the Elasticsearch index
        name = 'projects'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Project # The model associated with this Document
        fields=['project_name',"wiki"]


@registry.register_document
class CardDocument(Document):
    # project_name = Text()
    # lid= fields.IntegerField()
    class Index:
        name = 'cards'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Card # The model associated with this Document

@registry.register_document
class ListDocument(Document):
    cards=fields.Nested(CardDocument)
    class Index:
        # Name of the Elasticsearch index
        name = 'lists'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = List
        fields=['list_name']



