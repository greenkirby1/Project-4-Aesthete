from .common import ArtworkSerializer, ArtworkCreatorSerializer
from comments.serializers.common import CommentSerializer

class PopulatedArtworkSerializer(ArtworkSerializer):
  comments = CommentSerializer(many=True)

class PopulatedArtworkCreatorSerializer(ArtworkCreatorSerializer):
  comments = CommentSerializer(many=True)