from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

class UserAdmin(UserAdmin):
    # Customize the admin panel for your user model

 admin.site.register(User, UserAdmin)

# Register your models here.
