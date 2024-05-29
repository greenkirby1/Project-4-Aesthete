from .common import UserSerializer
from ..models import User
from artworks.serializers.common import ArtworkSerializer

class PopulatedUserSerializer(UserSerializer):
  created_collection = ArtworkSerializer(many=True)