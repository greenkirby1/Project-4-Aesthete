from rest_framework import serializers
from ..models import Artwork

class ArtworkSerializer(serializers.ModelSerializer):
  class Meta:
    model = Artwork
    fields = '__all__'


class PreviewArtworkSerializer(serializers.ModelSerializer):
  class Meta:
    model = Artwork
    exclude = ('added_on', 'likes',)


class ArtworkCreatorSerializer(serializers.ModelSerializer):
  class Meta:
    model = Artwork
    exclude = ('creator',)


class UserPreviewArtworkSerialzer(serializers.ModelSerializer):
  class Meta:
    model = Artwork
    exclude = ('creator', 'likes',)