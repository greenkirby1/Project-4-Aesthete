from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers.common import CommentSerializer
from lib.permissions import IsCreator
from .models import Comment

# Create your views here.
class CommentIndexView(CreateAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer
  permission_classes = [IsAuthenticated]

  def perform_create(self, serializer):
    serializer.save(creator=self.request.user)
  
class CommentDetailView(DestroyAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer
  permission_classes = [IsCreator]