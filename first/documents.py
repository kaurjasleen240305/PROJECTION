from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl import fields
from elasticsearch_dsl.connections import connections
from .models import Project,List,Card,User
from django_elasticsearch_dsl.registries import registry
from elasticsearch import Elasticsearch




@registry.register_document
class ProjectDocument(Document):
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
    lid=fields.ObjectField(properties={
        'pk':fields.IntegerField(),
        'pid':fields.ObjectField(properties={
        'pk':fields.IntegerField(),
    })
    })
    class Index:
        name = 'cards'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Card # The model associated with this Document
        fields=['card_name']



@registry.register_document
class ListDocument(Document):
    pid=fields.ObjectField(properties={
        'pk':fields.IntegerField(),
    })
    class Index:
        # Name of the Elasticsearch index
        name = 'lists'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = List
        fields=['list_name']


