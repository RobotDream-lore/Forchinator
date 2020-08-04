from django.urls import path, include
from .views import *

urlpatterns = [
    path('', DisplayController.as_view()),
    path('control/', DoRealTimeControl.as_view()),
    path('routines/list.json', GetRoutines.as_view()),
    path('routines/watch/<str:routine_name>', GetRoutine.as_view()),
    path('routines/save/<str:routine_name>/', SaveRoutine.as_view()),
    path('routines/delete/<str:routine_name>', DeleteRoutine.as_view()),
    path('routines/try/<str:routine_name>', TryRoutine.as_view()),
    path('actions/list.json', GetActions.as_view()),
    path('actions/watch/<str:action_name>', GetAction.as_view()),
    path('actions/try/<str:action_name>', TryAction.as_view()),
    path('actions/save', SaveAction.as_view()),
    path('actions/delete/<str:action_name>', DeleteAction.as_view()),
]