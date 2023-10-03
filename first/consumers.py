import json
from channels.generic.websocket import AsyncWebsocketConsumer,WebsocketConsumer
from .models import User,Comment,Card
from asgiref.sync import async_to_sync

# class CardConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.card_id=self.scope['url_route']['kwargs']['card_id']
#         self.card_id=f'card_{self.card_id}'
#         self.room_group_name=f'card_{self.card_id}'
         
#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name,
#         )
#         self.accept()
#         print("Handshaked")

#     async def disconnect(self,close_code):
#         print("Disconnected")
#         await self.channel_layer.group_discard(self.room_group_name,self.channel_name)

#     async def receive(self,text_data):
#         data=json.loads(text_data)
#         message=data['message']
#         sender=data['sender']
#         user_sent=User.objects.get(username=sender)
#         card_to_add=Card.objects.get(pk=self.card_id)
#         comment_obj=Comment.objects.create(
#             sender=user_sent,
#             card_id=card_to_add,
#             comment=message,
#         )
#         print(comment_obj)
#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 'type':'chat_message',
#                 'message':message,
#             }
#         )


class CardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
      self.card_id=self.scope['url_route']["kwargs"]['card_id']
      self.room_group_name=f"chat_{self.card_id}"
      #JOIN ROOM
      await self.channel_layer.group_add(
          self.room_group_name,self.channel_name
      )
      self.accept()

    async def disconnect(self,close_code):
        ##LEAVE ROOM GROUP
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )
    ##RECIEVE MESSAGE FROM WEBSOCKET
    async def receive(self,text_data):
        print("Message recived")
        text_data_json=json.loads(text_data)
        message=text_data_json["message"]
        print(self.room_group_name)
        ##SENDING MESSAGE IN ROOM GROUP
        await self.channel_layer.group_send(
            self.room_group_name, {"type":"chat.message","message": message}
        )
    ##reciever message form room group
    def chat_message(self,event):
        message=event['message']
        self.send(text_data=json.dumps({"message": message}))
