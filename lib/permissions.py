from rest_framework.permissions import BasePermission, SAFE_METHODS
from users.models import User

class IsCreatorOrReadOnly(BasePermission):

  def has_object_permission(self, request, view, obj):
    if request.method in SAFE_METHODS:
      return True
    
    return obj.creator == request.user or request.user.is_admin
  

class IsCreator(BasePermission):

  def has_object_permission(self, request, view, obj):
    # print('this is user', request.user)
    return obj.creator == request.user or request.user.is_admin
  

class IsArtist(BasePermission):
  
  def has_permission(self, request, view):
    return request.user.is_artist or request.user.is_admin
      

class IsArtistOrReadOnly(BasePermission):

  def has_permission(self, request, view):
    if request.method in SAFE_METHODS:
      return True
    
    return request.user.is_artist or request.user.is_admin