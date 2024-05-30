from django.db import models
from django.urls import reverse
from django.template.defaultfilters import slugify
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  is_artist = models.BooleanField(default=False, verbose_name='artist')
  image = models.URLField(max_length=200, default='')
  facebook = models.URLField(max_length=200, blank=True, null=True)
  instagram = models.URLField(max_length=200, blank=True, null=True)
  twitter_x = models.URLField(max_length=200, blank=True, null=True)
  website = models.URLField(max_length=200, blank=True, null=True)
  likes = models.ManyToManyField(
    'users.User',
    related_name='liked_artists'
  )

  def save(self, *args, **kwargs):
    if self.password and not self.password.startswith('pbkdf2_sha256'):
      self.set_password(self.password)
    super().save(*args, **kwargs)