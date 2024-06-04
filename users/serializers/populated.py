from .common import UserSerializer, ProfileSerializer, PreviewUserSerializer
from ..models import User
from artworks.serializers.common import PreviewArtworkSerializer, UserPreviewArtworkSerialzer
from artworks.serializers.populated import PopulatedArtworkCreatorSerializer
from rest_framework.serializers import ModelSerializer

class PopulatedProfileSerializer(ModelSerializer):
  created_collection = PopulatedArtworkCreatorSerializer(many=True)
  liked_artists = PreviewUserSerializer(many=True)
  curated_collection = PreviewArtworkSerializer(many=True)

  class Meta:
    model = User
    fields = (
      'id', 
      'first_name', 
      'last_name', 
      'email', 
      'username', 
      'password', 
      'is_artist',
      'image', 
      'facebook',
      'instagram',
      'twitter_x',
      'website',
      'likes',
      'created_collection',
      'liked_artists',
      'curated_collection',
    )


class PopulatedUserSerializer(UserSerializer):
  created_collection = UserPreviewArtworkSerialzer(many=True)