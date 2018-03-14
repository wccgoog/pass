from django.db import models
import datetime
from django.utils import timezone

# Create your models here.
class Article(models.Model):
    author=models.CharField(max_length=20)
    author2=models.CharField(max_length=20,default='no_one')
    content=models.TextField()
    title=models.CharField(max_length=70)
    created_time=models.DateTimeField()
    modified_time=models.DateTimeField()
    excerpt=models.CharField(max_length=200,blank=True)
    def __str__(self):
        return self.title
    def get_absolute_url(self):
        return reverse('wccweb:detail',kwargs={'pk':self.pk})

class Tag(models.Model):
    name=models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Category(models.Model):
    name=models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__(self):
        return self.question_text
    def was_published_recently(self):
        now=timezone.now()
        return now-datetime.timedelta(days=1)<=self.pub_date<=now
    was_published_recently.admin_order_field='pub_date'
    was_published_recently.boolean=True
    was_published_recently.short_description='Published recently?'

class Choice(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text