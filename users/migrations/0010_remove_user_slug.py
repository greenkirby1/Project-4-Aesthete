# Generated by Django 5.0.6 on 2024-05-30 12:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_user_slug'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='slug',
        ),
    ]
