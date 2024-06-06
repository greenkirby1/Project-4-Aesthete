from django.db import models
from django.utils import timezone

# Create your models here.
class Comment(models.Model):
  creator = models.ForeignKey(
    'users.User',
    related_name='comments_created',
    on_delete=models.CASCADE,
    blank=True,
    # null=True
  )
  text = models.TextField(max_length=1000)
  on_artwork = models.ForeignKey(
    'artworks.Artwork',
    related_name='comments',
    on_delete=models.CASCADE,
    # blank=True,
    null=True
  )
  created_on = models.DateTimeField(default=timezone.now)


  def __str__(self):
    return f'Comment on {self.on_artwork.title} - {self.creator}'