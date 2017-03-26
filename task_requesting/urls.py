from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^tasklist/$', views.taskList, name='tasklist'),
]
