from rest_framework.serializers import ModelSerializer
from ..models import User
from artworks.serializers.common import ArtworkSerializer

class UserSerializer(ModelSerializer):
  created_collection = ArtworkSerializer

  class Meta:
    model = User
    field = ('id', 'username', 'email', 'created_collection')