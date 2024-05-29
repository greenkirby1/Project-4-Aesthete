from rest_framework.permissions import BasePermission, SAFE_METHODS
from users.models import User

class IsCreatorOrReadOnly(BasePermission):

  def has_object_permission(self, request, view, obj):
    if request.method in SAFE_METHODS:
      return True
    
    return obj.creator == request.user or request.user.is_staff
  

class IsCreator(BasePermission):

  def has_object_permission(self, request, view, obj):
    # print('this is user', request.user)
    return obj.creator == request.user or request.user.is_staff
  

class IsArtist(BasePermission):
  
  def has_permission(self, request, view):
    return request.user.is_artist or request.user.is_staff
      

class IsArtistOrReadOnly(BasePermission):

  def has_permission(self, request, view):
    if request.method in SAFE_METHODS:
      return True
    
    return request.user.is_artist or request.user.is_staff
  

class IsCurrentUser(BasePermission):

  def has_object_permission(self, request, view, obj):
    print('OBJ USERNAME ->', obj.username)
    print('OBJ USERNAME ->', request.user.username)
    return obj.username == request.user.username or request.user.is_staff