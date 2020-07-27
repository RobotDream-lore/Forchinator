from django.shortcuts import render, redirect
from django.views import View
from django.http import JsonResponse
from .forms import SignInForm
from django.contrib.auth.models import User, Permission
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
import time
import os


class Logout( LoginRequiredMixin, View):
    login_url = '/login/'
    def get(self,request):
        logout(request)
        return redirect('/login/')


class Index( LoginRequiredMixin, View):
    login_url = '/login/'
    template = 'index.html'
    
    def get(self,request):
        return render(request, self.template)

class Login( View):
    template = 'login.html'
    form_class = SignInForm

    def get(self, request):
        return render(request, self.template)

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        
        if form.is_valid():

            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            
            if user is not None:
                login(request,user)
                return redirect('/index/')
            else:
                print("Non Autenticato")

        return render(request, self.template)        

        