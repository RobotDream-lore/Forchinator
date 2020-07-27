from django.urls import path
from .views import Login, Index, Logout

urlpatterns = [
    path('login/', Login.as_view()),
    path('index/', Index.as_view()),
    path('logout/', Logout.as_view()),
    path('', Index.as_view())
]