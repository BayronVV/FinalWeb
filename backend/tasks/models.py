from django.db import models
from django.conf import settings
from profiles.models import Profile


class Task(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.PositiveSmallIntegerField(default=0)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.RESTRICT,
        limit_choices_to={'is_superuser': False},
        related_name='tasks',
        null=True
    )
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.name