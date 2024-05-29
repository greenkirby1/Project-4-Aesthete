from rest_framework.generics import CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers.common import RegisterSerializer, ProfileSerializer, UserSerializer
from .serializers.populated import PopulatedUserSerializer
from lib.permissions import IsCurrentUser
from lib.views import UsernameDetailView, UpdateLikesView


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
  

class UserDetailView(UsernameDetailView, RetrieveAPIView):
  lookup_field = 'slug'
  serializer_class = PopulatedUserSerializer
  permission_classes = [IsAuthenticated]
  

class UserLikesView(UsernameDetailView, UpdateLikesView):
  lookup_field = 'slug'
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]