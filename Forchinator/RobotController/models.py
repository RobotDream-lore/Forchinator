from django.db import models

# Create your models here.

class RobotPosition(models.Model):
     id = models.AutoField(primary_key=True)
     name = models.CharField(max_length=30, default='')
     motor1 = models.IntegerField(default = 0)      
     motor2 = models.IntegerField(default = 0) 
     motor3 = models.IntegerField(default = 0) 
     motor4 = models.IntegerField(default = 0)
     speed = models.IntegerField(default = 0) 
     algorithm = models.CharField(max_length=4, default = 'SP') 
     ev_girare = models.BooleanField(default = False)
     ev_succhiare = models.BooleanField(default = False)
     sensor1_hold = models.BooleanField(default = False)
     sensor2_hold = models.BooleanField(default = False)
     startup_delay = models.IntegerField(default = 0)

     def __str__(self):
         return self.name

class RobotRoutine(models.Model):
     id = models.AutoField(primary_key=True)
     name = models.CharField(max_length=30, default='')
     homing_freq = models.IntegerField(default = 100) 
     positions = models.ManyToManyField(RobotPosition) 
     encoded_positions = models.CharField(max_length=100, default='')

     def __str__(self):
         return self.name