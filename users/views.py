from rest_framework.generics import CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers.common import RegisterSerializer, UserSerializer, ProfileSerializer
from lib.permissions import IsCurrentUser
from .serializers.populated import PopulatedUserSerializer


# Create your views here.
class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer


class ProfileView(RetrieveUpdateAPIView):
  queryset = User.objects.all()
  permission_classes = [IsCurrentUser]

  def get_serializer_class(self):
    if self.request.method == 'GET':
      return PopulatedUserSerializer
    return ProfileSerializer
  

class UserDetailView(RetrieveAPIView):
  lookup_field = 'slug'
  serializer_class = PopulatedUserSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    slug = self.kwargs['slug']
    return User.objects.filter(username=slug)