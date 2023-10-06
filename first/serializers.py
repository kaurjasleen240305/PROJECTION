from rest_framework import serializers
from .models import User,Project,List,Card,Card_attachments,Card_Description,Card_Labels,Card_related_images,Card_Subtask,Comment


class Card_Att_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Card_attachments
        field='__all__'

class Card_Desc_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Card_Description,
        field="__all__"    


class Card_Label_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Card_Labels,
        field="__all__" 


class Card_Images_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Card_related_images,
        field="__all__"          
    

class CommentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        field='__all__'


class Card_subtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Card_Subtask
        fields=['task_name','assignees','is_complete','card_id']



class CardSerializer(serializers.ModelSerializer):
    card_tasks=Card_subtaskSerializer(many=True)
    comments=CommentModelSerializer(many=True)
    card_images=Card_Images_Serializer(many=True)
    card_att=Card_Att_Serializer(many=True)
    card_desc=Card_Desc_Serializer(many=True)
    card_labels=Card_Label_Serializer(many=True)
    class Meta:
        model=Card
        fields=['pk','card_name','card_logo','created_time','completion_status','card_tasks','lid','comments','card_att','card_images','card_desc','card_labels']
        partial=True

class Card_createSerializer(serializers.ModelSerializer):
    class Meta:
        model=Card
        fields=['card_name',"completion_status","lid"]


class ListModelSerializer(serializers.ModelSerializer):
    cards=CardSerializer(many=True)
    class Meta:
        model = List
        fields = ['pk','list_name','pid','cards'] 
        read_only_fields=['cards']


class ListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=List
        fields=['list_name','pid']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['username','is_active',"is_superuser"]
        partial=True


class ProjectModelSerializer(serializers.ModelSerializer):
    lists = ListModelSerializer(many=True)
    project_members=UserSerializer(many=True)
    class Meta:
        model = Project
        fields = ['pk','project_name','description','wiki','is_private','project_logo','lists','project_members','creator'] 
        partial=True


class ProjectListModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields=['project_name']


class Procreser(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['project_name','creator','wiki'] 




class UserPartialUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=["is_active","is_superuser"]
        partial=True




class CombinedSerializer(serializers.Serializer):
    data1=ProjectModelSerializer(many=True)
    data2=Card_subtaskSerializer(many=True)