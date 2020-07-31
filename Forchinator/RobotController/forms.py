from django import forms

class PositionForm(forms.Form):
    name = forms.CharField(max_length=30, label='name')
    motor1 = forms.IntegerField(label='motor1',required=True)
    motor2 = forms.IntegerField(label='motor2',required=True)
    motor3 = forms.IntegerField(label='motor3',required=True)
    motor4 = forms.IntegerField(label='motor4',required=True)
    speed = forms.IntegerField(label='speed',required=True)
    startup_delay = forms.IntegerField(label='startup_delay',required=True)
    sensor1_hold = forms.BooleanField(label='sensor1_hold', initial=False, required=False)
    sensor2_hold = forms.BooleanField(label='sensor2_hold', initial=False, required=False)
    ev_succhiare = forms.BooleanField(label='ev_succhiare', initial=False, required=False)
    ev_girare = forms.BooleanField(label='ev_girare', initial=False, required=False)
    

