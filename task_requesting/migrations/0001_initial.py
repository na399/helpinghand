# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=128)),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='TaskRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('title', models.CharField(max_length=128)),
                ('url', models.URLField()),
                ('description', models.TextField(blank=True)),
                ('when_needed', models.DateTimeField(db_index=True)),
                ('created', models.DateTimeField(db_index=True, auto_now_add=True)),
                ('done', models.BooleanField(default=False)),
                ('category', models.ForeignKey(to='task_requesting.Category')),
                ('offers', models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True, related_name='offers_from')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='task_requests')),
                ('view_permission', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Task requests',
            },
        ),
    ]
