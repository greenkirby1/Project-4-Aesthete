from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import RegisterView, ProfileView


urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', TokenObtainPairView.as_view()),
  path('profile/<int:pk>/', ProfileView.as_view())
]