from .common import UserSerializer, ProfileSerializer
from ..models import User
from artworks.serializers.common import ArtworkSerializer

class PopulatedProfileSerializer(ProfileSerializer):
  created_collection = ArtworkSerializer(many=True)
  liked_artists = UserSerializer(many=True)


class PopulatedUserSerializer(UserSerializer):
  created_collection = ArtworkSerializer(many=True)
  liked_artists = UserSerializer(many=True)