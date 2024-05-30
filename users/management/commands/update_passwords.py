from users.models import User
from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password


class Command(BaseCommand):
  
  def handle(self, *args, **kwargs):
    print('updating pass...')
    users = User.objects.all()
    for user in users:
      # check passwords not hashed
      if not user.password.startswith('pbkdf2_sha256'):
        hash_pass = make_password(user.password)
        user.password = hash_pass
        user.save()
        self.stdout.write(self.style.SUCCESS(f'password hashed for {user.username}'))
      else:
        self.stdout.write(self.style.SUCCESS(f'password already hashed for {user.username}'))

        