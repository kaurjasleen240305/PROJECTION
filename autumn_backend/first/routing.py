from django.urls import re_path,path
from .import consumers


websocket_urlpatterns=[
    path("ws/cards/<int:card_id>/comments/",consumers.CardConsumer.as_asgi()),
    
]