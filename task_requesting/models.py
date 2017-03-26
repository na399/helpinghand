from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify


class Category(models.Model):
    name = models.CharField(max_length=128)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class TaskRequest (models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name='task_requests')

    category = models.ForeignKey(Category)

    title = models.CharField(max_length=128)
    slug = models.SlugField(blank=True)
    description = models.TextField(blank=True)

    when_needed = models.DateTimeField(db_index=True)

    created = models.DateTimeField(auto_now_add=True,
                                   db_index=True)

    view_permission = models.ManyToManyField(settings.AUTH_USER_MODEL)

    offers = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                    related_name='offers_from',
                                    blank=True)

    done = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.slug= slugify(self.title)
        super(TaskRequest, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Task requests'

    def __str__(self):
        return self.title



