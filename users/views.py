from rest_framework.generics import CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers.common import RegisterSerializer
from lib.permissions import IsCreator


# Create your views here.
class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

class ProfileView(RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer
  permission_classes = [IsCreator]

# class UserDetailView(RetrieveUpdateAPIView):
#   queryset = User.objects.all()