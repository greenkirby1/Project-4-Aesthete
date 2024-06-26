# Generated by Django 5.0.6 on 2024-05-30 12:25

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_alter_user_image_alter_user_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_artists', to=settings.AUTH_USER_MODEL),
        ),
    ]
