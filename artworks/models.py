from django.db import models
from django.utils import timezone

# Create your models here.
class Artwork(models.Model):
  title = models.CharField(max_length=200, default='Untitled')
  image = models.URLField(max_length=200, default='')
  year_created = models.PositiveIntegerField(default=0)
  creator = models.ForeignKey(
    'users.User',
    related_name='created_collection',
    on_delete=models.SET_NULL,
    null=True,
    blank=True
  )
  caption = models.TextField(max_length=1000, blank=True, null=True)
  likes = models.ManyToManyField(
    'users.User',
    related_name='curated_collection'
  )
  added_on = models.DateTimeField(default=timezone.now)


  def __str__(self):
    return f'{self.title} ({self.year_created}) - {self.creator}'
