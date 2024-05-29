from django.urls import path
from .views import UserDetailView, UserLikesView


urlpatterns = [
  path('<str:slug>/', UserDetailView.as_view()),
  path('<str:slug>/like/', UserLikesView.as_view())
]