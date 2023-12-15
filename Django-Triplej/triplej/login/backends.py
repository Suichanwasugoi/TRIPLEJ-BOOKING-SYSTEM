# # backends.py
# from django.contrib.auth.backends import ModelBackend
# from django.contrib.auth import get_user_model
# from django.contrib.auth.hashers import check_password

# class EmailBackend(ModelBackend):
#     def authenticate(self, request, email=None, password=None, **kwargs):
#         user = get_user_model()
#         try:
#             user = user.objects.get(email=email)
#         except user.DoesNotExist:
#             return None

#         # Use Django's authenticate method to verify the password
#         if user.check_password(password):
#             return user
#         else:
#             return None
