# Generated by Django 4.2.2 on 2023-09-27 16:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('first', '0005_card_project_list_comment_card_subtask_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card_subtask',
            name='card_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='card_tasks', to='first.card'),
        ),
    ]
