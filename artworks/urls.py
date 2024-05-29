from django.urls import path
from .views import ArtworkIndexView, ArtworkSingleView, ArtworkLikesView

urlpatterns = [
  path('', ArtworkIndexView.as_view()),
  path('<int:pk>/', ArtworkSingleView.as_view()),
  path('<int:pk>/like/', ArtworkLikesView.as_view())
]