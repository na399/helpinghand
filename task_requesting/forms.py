from urllib import request
from django.core.files.base import ContentFile
from django.utils.text import slugify
from django import forms
from .models import TaskRequest


class TaskCreateForm(forms.ModelForm):

    class Meta:
        model = TaskRequest
        fields = ('title', 'description')

    def save(self, force_insert=False, force_update=False, commit=True):
        task = super(TaskCreateForm, self).save(commit=False)

        if commit:
            task.save()
        return task
