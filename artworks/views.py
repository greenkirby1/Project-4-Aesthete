from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Artwork
from .serializers.common import ArtworkSerializer
from lib.permissions import IsOwnerOrReadOnly, IsArtist


# Create your views here.
class ArtworkIndexView(ListCreateAPIView):
  queryset = Artwork.objects.all()
  serializer_class = ArtworkSerializer
  permission_classes = [IsArtist]

class ArtworkSingleView(RetrieveUpdateDestroyAPIView):
  queryset = Artwork.objects.all()
  serializer_class = ArtworkSerializer
  permission_classes = [IsOwnerOrReadOnly]