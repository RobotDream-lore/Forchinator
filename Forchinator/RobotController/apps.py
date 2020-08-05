from django.apps import AppConfig
import RPi.GPIO as GP

class RobotcontrollerConfig(AppConfig):
    name = 'RobotController'
    def ready(self):
        GP.setwarnings(False)
        GP.setmode(GP.BCM)
        GP.setup(12, GP.OUT)
        GP.output(12, GP.HIGH)