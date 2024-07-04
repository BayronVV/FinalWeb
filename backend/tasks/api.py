from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import AllowAny

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ['priority']

    def get_queryset(self):
        return self.request.user.tasks.all()