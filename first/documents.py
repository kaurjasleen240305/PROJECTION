from elasticsearch_dsl import Document,Text,Keyword,Integer,Search
from django_elasticsearch_dsl import fields
from elasticsearch_dsl.connections import connections
from .models import Project,List,Card
from django_elasticsearch_dsl.registries import registry
from elasticsearch import Elasticsearch




# @registry.register_document
# class ProjectDocument(Document):
#     id=Integer()
#     project_name=fields.TextField(attr="project_name")

#     class Index:
#         name="project_index"

#     class Django:
#         model=Project


# @registry.register_document
# class ListDocument(Document):
#     list_name=fields.TextField(attr="list_name")
#     id=Integer()
#     class Index:
#         name="list_index"

#     class Django:
#         model=List


# @registry.register_document
# class CardDocument(Document):
#     card_name=fields.TextField(attr="card_name")
#     id=Integer()
#     class Index:
#         name="card_index"

#     class Django:
#         model=Card


