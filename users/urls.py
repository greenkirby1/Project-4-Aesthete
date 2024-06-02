from django.urls import path
from .views import UserDetailView, UserLikesView, UserIndexView


urlpatterns = [
  path('', UserIndexView.as_view()),
  path('<str:username>/', UserDetailView.as_view()),
  path('<str:username>/like/', UserLikesView.as_view())
]