from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'priority', 'completed']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
    
        return super(TaskSerializer, self).create(validated_data)
