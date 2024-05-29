from .common import ArtworkSerializer
from comments.serializers.common import CommentSerializer

class PopulatedArtworkSerializer(ArtworkSerializer):
  comments = CommentSerializer(many=True)