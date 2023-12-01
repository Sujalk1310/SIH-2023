from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    aadhar = models.CharField(max_length=12)
    contact = models.CharField(max_length=10)
    password = models.CharField(max_length=100)
    access = models.CharField(max_length=3, default="usr")
    dept = models.CharField(max_length=100, default=None)
    lang = models.CharField(max_length=2, default="en")
    api = models.CharField(max_length=10, default=None)

class Worker(models.Model):
    w_name = models.CharField(max_length=100)
    aadhar = models.CharField(max_length=12, default=None)
    password = models.CharField(max_length=100, default="123")
    contact = models.CharField(max_length=10)                                   
    status = models.CharField(max_length=3, default="AVA")
    dept = models.CharField(max_length=100, default=None)

class Grievances(models.Model):
    uid = models.ForeignKey(User, on_delete=models.CASCADE, related_name='u_grievances')
    wid = models.ForeignKey(Worker, null=True, blank=True, on_delete=models.CASCADE, related_name='w_grievances')
    date = models.DateTimeField(auto_now_add=True)
    priority = models.CharField(max_length=3, default="NOR")
    dept = models.CharField(max_length=100)
    status = models.CharField(max_length=10, default="Active")
    stage = models.SmallIntegerField(default=1)
    usr_img = models.ImageField(upload_to =r'D:\Project\EchoSphere-Main\Backend\EchoSphere\api\media\uploads\user', default=None, null=True, blank=True)
    wrk_img = models.ImageField(upload_to =r'D:\Project\EchoSphere-Main\Backend\EchoSphere\api\media\uploads\worker', default=None, null=True, blank=True)
    lat = models.FloatField()
    long = models.FloatField()
    location = models.CharField(max_length=100)
    summary = models.CharField(max_length=500)
