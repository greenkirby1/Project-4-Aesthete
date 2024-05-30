from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from users.models import User


class UsernameDetailView(APIView):

  def get_queryset(self):
    username = self.kwargs['username']
    return User.objects.filter(username=username)
  

class UpdateLikesView(UpdateAPIView):

  def patch(self, request, username):
    user = self.get_object()
    print('this is what you like ->', user)
    if not request.user in user.likes.all():
      print('you liked user')
      user.likes.add(request.user)
      user.save()
      return Response(status=201)
    else:
      print('you already liked user')
      user.save()
      user.likes.remove(request.user)
      return Response(status=204)