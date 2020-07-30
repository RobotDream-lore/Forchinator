from django import forms

class PositionForm(forms.Form):
    name = forms.CharField(max_length=30, label='name')
    motor1 = forms.IntegerField(label='motor1',required=True)
    motor2 = forms.IntegerField(label='motor2',required=True)
    motor3 = forms.IntegerField(label='motor3',required=True)
    motor4 = forms.IntegerField(label='motor4',required=True)
    speed = forms.IntegerField(label='speed',required=True)
    startup_delay = forms.IntegerField(label='startup_delay',required=True)
    #ev_girare = forms.BooleanField(label='ev_girare',required=True)
    #ev_succhiare = forms.BooleanField(label='ev_succhiare',required=True)
    #sensore1_hold = forms.BooleanField(label='sensor1_hold',required=True)
    #sensore2_hold = forms.BooleanField(label='sensore2_hold',required=True)
    

