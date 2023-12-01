from django.contrib import admin
from django.utils.safestring import mark_safe
from api.models import User, Worker, Grievances

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'aadhar', 'contact', 'access', 'dept', 'lang', 'api')
    list_filter = ('access', 'dept', 'lang')
    search_fields = ('name', 'aadhar', 'contact')

@admin.register(Worker)
class WorkerAdmin(admin.ModelAdmin):
    list_display = ('w_name', 'aadhar', 'contact', 'status', 'dept')
    list_filter = ('status', 'dept')
    search_fields = ('w_name', 'aadhar', 'contact')

@admin.register(Grievances)
class GrievancesAdmin(admin.ModelAdmin):
    list_display = ('uid', 'wid', 'date', 'priority', 'dept', 'status', 'stage')
    list_filter = ('priority', 'dept', 'status', 'stage')
    search_fields = ('uid__name', 'wid__w_name', 'dept', 'status', 'stage')

    # Customize the form for adding and editing Grievances if needed
    fields = ('uid', 'wid', 'priority', 'dept', 'status', 'stage', 'usr_img', 'wrk_img', 'lat', 'long', 'location', 'summary')

