from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Artwork
from .serializers.common import ArtworkSerializer
from lib.permissions import IsCreatorOrReadOnly, IsArtistOrReadOnly
from lib.serializers import ArtworkCommentsSerializer


# Create your views here.
class ArtworkIndexView(ArtworkCommentsSerializer, ListCreateAPIView):
  queryset = Artwork.objects.all()
  serializer_class = ArtworkSerializer
  permission_classes = [IsArtistOrReadOnly]

class ArtworkSingleView(ArtworkCommentsSerializer, RetrieveUpdateDestroyAPIView):
  queryset = Artwork.objects.all()
  serializer_class = ArtworkSerializer
  permission_classes = [IsCreatorOrReadOnly]