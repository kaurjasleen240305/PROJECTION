import json
from channels.generic.websocket import AsyncWebsocketConsumer,WebsocketConsumer
from .models import User,Comment,Card
from asgiref.sync import async_to_sync,sync_to_async

class CardConsumer(WebsocketConsumer):

   
    def connect(self):
        self.card_id=self.scope['url_route']['kwargs']['card_id']
        self.card_id=f'card_{self.card_id}'
        self.room_group_name=f'card_{self.card_id}'
         
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )
        # channels=self.get_channel_names_in_room(room_name=self.room_group_name)
        
        self.accept()
        
        print("Handshaked")

    def disconnect(self,close_code):
        print("Disconnected")
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name,self.channel_name)

    def receive(self,text_data):
        data=json.loads(text_data)
        message=data['message']
        sender=data['sender']
        try:
            user=User.objects.get(username=sender)
            print(user)
        except :
            self.send({"message":"User not found"})
        print("Hi")
        # self.send(json.dumps({
        #     'type':'chat_message',
        #     f'{sender}':message,
        # }))
        room_name=(self.room_group_name)
        print(message)
        async_to_sync(self.channel_layer.group_send)(
            room_name, {"type": "chat.message","message": message}
        )
        print("Sent")


    def chat_message(self, event):
      print("Hello")
      message = event['message']
      print(message)
      (self.send)(json.dumps({
            'type':'chat.message',
            'message':message,
     }))
    # Do something with the message (e.g., update UI)
    

    
    


# class CardConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#       self.card_id=self.scope['url_route']["kwargs"]['card_id']
#       self.room_group_name=f"chat_{self.card_id}"
#       #JOIN ROOM
#       await self.channel_layer.group_add(
#           self.room_group_name,self.channel_name
#       )
#       self.accept()
#       print("CONNECTED")


#     async def disconnect(self,close_code):
#         ##LEAVE ROOM GROUP
#         await self.channel_layer.group_discard(
#             self.room_group_name, self.channel_name
#         )
#         print("DISCONNECTED")


#     ##RECIEVE MESSAGE FROM WEBSOCKET
#     async def receive(self,text_data):
#         print("Message recived")
#         text_data_json=json.loads(text_data)
#         message=text_data_json["message"]
#         print(self.room_group_name)
#         ##SENDING MESSAGE IN ROOM GROUP
#         await self.channel_layer.group_send(
#             self.room_group_name, {"type":"chat.message","message": message}
#         )


#     ##reciever message form room group
#     def chat_message(self,event):
#         message=event['message']
#         self.send(text_data=json.dumps({"message": message}))
