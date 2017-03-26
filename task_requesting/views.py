from django.shortcuts import render
from .models import TaskRequest


def taskList(request):
    TaskRequest_list = TaskRequest.objects.all()
    context_dict = {'TaskRequests': TaskRequest_list}

    return render(request, 'tasklist.html', context_dict)
