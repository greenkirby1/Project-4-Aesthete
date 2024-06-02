from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Artwork
from .serializers.common import ArtworkSerializer
from lib.permissions import IsCreatorOrReadOnly, IsArtistOrReadOnly
from lib.serializers import ArtworkCommentsSerializer


# Create your views here.
class ArtworkIndexView(ArtworkCommentsSerializer, ListCreateAPIView):
  queryset = Artwork.objects.all()
  permission_classes = [IsArtistOrReadOnly]

  def perform_create(self, serializer):
    serializer.save(creator=self.request.user)


class ArtworkSingleView(ArtworkCommentsSerializer, RetrieveUpdateDestroyAPIView):
  queryset = Artwork.objects.all()
  permission_classes = [IsCreatorOrReadOnly]


class ArtworkLikesView(UpdateAPIView):
  queryset = Artwork.objects.all()
  serializer_class = ArtworkSerializer
  permission_classes = [IsAuthenticated]

  def patch(self, request, pk):
    artwork = self.get_object()
    if not request.user in artwork.likes.all():
      print('you liked artwork')
      artwork.likes.add(request.user)
      artwork.save()
      return Response(status=201)
    else:
      print('you unliked artwork')
      artwork.save()
      artwork.likes.remove(request.user)
      return Response(status=204)