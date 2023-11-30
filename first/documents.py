from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl import fields
from elasticsearch_dsl.connections import connections
from .models import Project,List,Card
from django_elasticsearch_dsl.registries import registry
from elasticsearch import Elasticsearch




@registry.register_document
class ProjectDocument(Document):
    # project_name = Text()
    class Index:
        # Name of the Elasticsearch index
        name = 'projects'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Project # The model associated with this Document

        # The fields of the model you want to be indexed in Elasticsearch
        fields = [
            'project_name',
        ]


@registry.register_document
class ListDocument(Document):
    pid = fields.IntegerField()
    class Index:
        # Name of the Elasticsearch index
        name = 'lists'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = List # The model associated with this Document

        # The fields of the model you want to be indexed in Elasticsearch
        fields = [
            'list_name',
        ]



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

        # The fields of the model you want to be indexed in Elasticsearch
        fields = [
            'card_name',
        ]