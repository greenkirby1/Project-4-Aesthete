from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from .models import User
from .serializers.common import RegisterSerializer, ProfileSerializer, UserSerializer, UsernameSerializer
from .serializers.populated import PopulatedUserSerializer, PopulatedProfileSerializer
from lib.permissions import IsCurrentUser
from lib.views import UsernameDetailView, UpdateLikesView


# Create your views here.
class UserIndexView(ListAPIView):
  queryset = User.objects.all()
  serializer_class = UsernameSerializer
  # permission_classes = [IsAuthenticated]


class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

  # def perform_create(self, serializer):
  #   print(serializer.validated_data)


class ProfileView(RetrieveUpdateAPIView):
  queryset = User.objects.all()
  permission_classes = [IsCurrentUser]

  def get_serializer_class(self):
    if self.request.method == 'GET':
      return PopulatedProfileSerializer
    return ProfileSerializer
  
  def perform_update(self, serializer):
    password = serializer.validated_data.get('password')

    if password:
      serializer.validated_data['password'] = make_password(password)
      print('changed password')

    serializer.save()
    


class UserDetailView(UsernameDetailView, RetrieveAPIView):
  lookup_field = 'username'
  serializer_class = PopulatedUserSerializer
  permission_classes = [IsAuthenticated]
  

class UserLikesView(UsernameDetailView, UpdateLikesView):
  lookup_field = 'username'
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]