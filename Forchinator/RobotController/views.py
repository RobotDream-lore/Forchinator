from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
from django.views import View
from .forms import PositionForm
from .models import RobotPosition, RobotRoutine
from django.forms.models import model_to_dict

class DisplayController( LoginRequiredMixin, View):
    login_url = '/login/'
    template = 'dashboard.html'
    def get(self,request):
        return render(request, self.template)

class DoRealTimeControl( LoginRequiredMixin, View):
    login_url = '/login/'
    template = 'dashboard.html'

    def get(self,request):
        if(request.is_ajax):
            command_to_send = request.GET.getlist('data[]')
            print(command_to_send)
            return redirect('dashboard/')
    

class GetRoutines( LoginRequiredMixin, View):
    login_url = '/login/'
    template = 'dashboard.html'

    def get(self,request):
        if(request.is_ajax):
            ##Ritorna lista nomi di tutte le routines
            qs_rr = RobotRoutine.objects.all()
            data = []
            for d in qs_rr:
                data.append(d.name)
            return JsonResponse(data = data,safe = False)

class GetRoutine( LoginRequiredMixin, View):
    login_url = '/login/'
    template = 'dashboard.html'
    
    def get(self,request, routine_name):
        if(request.is_ajax):
            #Ritorna valori di tutta la routine
            data = []
            try:
                qs_rr = model_to_dict(RobotRoutine.objects.all().get(name = routine_name))
                for k,v in qs_rr.items():
                    if not (k == 'id' or k == 'positions' ):
                        data.append(v)
            except: 
                pass

            return JsonResponse(data = data,safe = False)
                

class SaveRoutine( LoginRequiredMixin, View):
    login_url = '/login/'
    template = 'dashboard.html'

    def get(self,request,routine_name):
        data = request.GET.getlist('data[]')
        print(data)
        #Salva Routine
        routine = RobotRoutine(name= routine_name, homing_freq = data[0], encoded_positions = data[1])
        routine.save()
        if(len(data[1]) > 0):
            #Aggiungere le istanze position al many2many
            pass
        return redirect('/dashboard/')

    def post(self,request,routine_name):
        if(request.is_ajax):
            form = self.form_class(request.POST)
            if form.is_valid():
                pass

class GetActions( LoginRequiredMixin, View):
    login_url = '/login/'
    template = 'dashboard.html'

    def get(self,request):
        if(request.is_ajax):
            qs_rp = RobotPosition.objects.all()
            data = []
            for d in qs_rp:
                data.append(d.name)
            return JsonResponse(data = data,safe = False)

class GetAction( LoginRequiredMixin, View):
    login_url = '/login/'
    template = 'dashboard.html'

    def get(self,request,action_name):
        if(request.is_ajax):
            data = []
            try:
                qs_rp = model_to_dict(RobotPosition.objects.all().get(name = action_name))
                for k,v in qs_rp.items():
                    if not (k == 'id'):
                        data.append(v)
            except:
                pass

            return JsonResponse(data = data,safe = False)

class SaveAction( LoginRequiredMixin, View):
    login_url = '/login/'
    template = 'dashboard.html'
    form_class = PositionForm
    
    def post(self,request):
        if(request.is_ajax):
            form = self.form_class(request.POST)
            if form.is_valid():
                qs_rp = RobotPosition.objects.all().filter(name = form.cleaned_data['name'])
                for k,v in form.cleaned_data.items():
                    print(k)
                    print(v)
                if(qs_rp.exists()):
                    qs_rp.update(**form.cleaned_data)
                else:
                    RobotPosition(**form.cleaned_data)
                pass
        return redirect('dashboard/')
