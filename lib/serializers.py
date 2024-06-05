from rest_framework.views import APIView
from artworks.serializers.populated import PopulatedArtworkSerializer
from artworks.serializers.common import ArtworkSerializer
from users.serializers.populated import PopulatedUserSerializer
from users.serializers.common import UserSerializer, ProfileSerializer

class ArtworkCommentsSerializer(APIView):

  def get_serializer_class(self):
    if self.request.method == 'GET':
      return PopulatedArtworkSerializer
    return ArtworkSerializer