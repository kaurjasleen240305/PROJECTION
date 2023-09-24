from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  username=models.CharField(max_length=255,unique=True,primary_key=True)  
  name=models.CharField(max_length=255,null=True)
  year=models.IntegerField(null=True)
  email=models.EmailField(max_length=255,null=True)
  enrolment_no=models.CharField(max_length=8)
  is_Member=models.BooleanField(default=True)
  profile_pic=models.ImageField(upload_to='user_profile_pics/',null=True,blank=True)
  USERNAME_FIELD='username'

  class Meta:
    verbose_name_plural='Users'
  def __str__(self):
    return f"{self.username}"
  

class Project(models.Model):
  project_name=models.CharField(max_length=125,unique=True)
  description=models.CharField(max_length=300,null=True)
  wiki=models.CharField(max_length=150,default="IMG PROJECT")
  created_time=models.DateTimeField(auto_now_add=True)
  project_members=models.ManyToManyField(User)
  is_private=models.BooleanField(default=False)
  project_logo=models.ImageField(upload_to='project_logo/')


class List(models.Model):
  list_name=models.CharField(max_length=150,unique=True)
  created_time=models.DateTimeField(auto_now_add=True)
  pid=models.ForeignKey(Project,on_delete=models.CASCADE)


class Card(models.Model):
  card_name=models.CharField(max_length=100,unique=True)
  card_logo=models.ImageField(upload_to='card_logo/')
  created_time=models.DateTimeField(auto_now_add=True)
  lid=models.ForeignKey(List,on_delete=models.CASCADE)
  completion_status=models.IntegerField()
  
class Card_Subtask(models.Model):
    card_id=models.ForeignKey(Card,on_delete=models.CASCADE)
    task_name=models.CharField(max_length=300,unique=True)
    assignees=models.ManyToManyField(User)
    is_complete=models.BooleanField(default=False)


class Comment(models.Model):
  card_id=models.ForeignKey(Card,on_delete=models.CASCADE)
  sender=models.ForeignKey(User,on_delete=models.CASCADE)
  comment=models.CharField(max_length=400,default="")
  comment_time=models.DateTimeField(auto_now=True)


class Card_Labels(models.Model):
  cid=models.ForeignKey(Card,on_delete=models.CASCADE)
  label_name=models.CharField(max_length=50,null=True)


class Card_Description(models.Model):
    cid=models.ForeignKey(Card,on_delete=models.CASCADE)
    content=models.CharField(max_length=500)
    added_by=models.ForeignKey(User,on_delete=models.CASCADE)
    added_at=models.DateTimeField(auto_now_add=True)

class Card_attachments(models.Model):
  cid=models.ForeignKey(Card,on_delete=models.CASCADE)
  content=models.URLField()
  added_by=models.ForeignKey(User,on_delete=models.CASCADE)
  added_at=models.DateTimeField(auto_now_add=True)

class Card_related_images(models.Model):
  cid=models.ForeignKey(Card,on_delete=models.CASCADE)
  content=models.ImageField(upload_to='card_images/')
  added_by=models.ForeignKey(User,on_delete=models.CASCADE)
  added_at=models.DateTimeField(auto_now_add=True)
    







