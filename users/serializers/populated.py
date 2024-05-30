from .common import UserSerializer, ProfileSerializer, PreviewUserSerializer
from ..models import User
from artworks.serializers.common import PreviewArtworkSerializer, UserPreviewArtworkSerialzer
from artworks.serializers.populated import PopulatedArtworkCreatorSerializer

class PopulatedProfileSerializer(ProfileSerializer):
  created_collection = PopulatedArtworkCreatorSerializer(many=True)
  liked_artists = PreviewUserSerializer(many=True)
  curated_collection = PreviewArtworkSerializer(many=True)


class PopulatedUserSerializer(UserSerializer):
  created_collection = UserPreviewArtworkSerialzer(many=True)