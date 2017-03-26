# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('task_requesting', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='taskrequest',
            name='url',
        ),
        migrations.AddField(
            model_name='taskrequest',
            name='slug',
            field=models.SlugField(default=datetime.datetime(2017, 3, 26, 0, 20, 43, 626072, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
