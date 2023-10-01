from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Project,List,Card,Card_related_images,Card_attachments,Card_Description,Card_Labels,Card_Subtask,Comment
from .models import User

class UserAdmin(UserAdmin):
    # Customize the admin panel for your user model

 admin.site.register(User, UserAdmin)
 admin.site.register(Project)
 admin.site.register(Card)
 admin.site.register(Comment)
 admin.site.register(Card_attachments)
 admin.site.register(Card_Description)
 admin.site.register(Card_Labels)
 admin.site.register(Card_Subtask)
 admin.site.register(Card_related_images)
 admin.site.register(List)

# Register your models here.
