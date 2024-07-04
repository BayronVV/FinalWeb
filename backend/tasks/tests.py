from django.test import TestCase
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.reverse import reverse
from rest_framework import status
from .models import Task
from django.contrib.auth import get_user_model

User = get_user_model() 

class TaskTests(APITestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user = User.objects.create_user(username="john", email="foo@bar.com")
        cls.token = Token.objects.create(user=cls.user)
        cls.task = Task.objects.create(
            name="My Task", description="My task description", user=cls.user
        )

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        cls.task.delete()
        cls.token.delete()
        cls.user.delete()

    def setUp(self):
        self.client.force_authenticate(user=self.user, token=self.token)

    def test_something(self):
        self.assertTrue(self.task.user == self.user)
    
    def test_get_task_list(self):
        url = reverse('task-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data.get("results")), 1)

    def test_get_task_detail(self):
        url = reverse('task-detail', kwargs={"pk": self.task.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get("name"), self.task.name)
