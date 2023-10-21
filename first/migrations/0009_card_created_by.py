# Generated by Django 4.2.6 on 2023-10-21 11:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('first', '0008_alter_card_card_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='cards_by_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
