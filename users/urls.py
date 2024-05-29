from django.urls import path
from .views import UserDetailView


urlpatterns = [
  path('<str:slug>/', UserDetailView.as_view()),
  # path('<slug:slug>/like/', UserLikesView.as_view())
]