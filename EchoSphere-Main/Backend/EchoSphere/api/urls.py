from django.urls import path
from . import views

urlpatterns = [
    path(route='grievances', view=views.get_all_grievances),
    path(route='grievances/u<int:id>', view=views.get_grievances_by_uid),
    path(route='grievances/g<int:id>', view=views.get_grievance_by_gid),
    path(route='register', view=views.register),
    path(route='logout', view=views.logout),
    path(route='login', view=views.login),
    path(route="update_stage/g<int:id>", view=views.update_stage),
    path(route="nlp", view=views.nlp_run),
    path(route="worker", view=views.get_worker_by_dept),
    path(route="worker/login", view=views.worker_login),
    path(route="worker/logout", view=views.worker_logout),
    path(route="worker/add/w<int:wid>/g<int:gid>", view=views.add_worker),
    path(route="usession", view=views.check_session),
    path(route="wsession", view=views.check_wsession),
    path(route="token", view=views.csrf_bhai),
    path(route="grievances/add/<int:id>", view=views.add_grievance),
]