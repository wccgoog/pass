from django.shortcuts import render,HttpResponse,get_object_or_404
# Create your views here.
from .models import Article,Choice
from django.http import Http404,HttpResponse,HttpResponseRedirect
from django.urls import reverse
from django.views import generic

class HomeView(generic.ListView):
    template_name='wccweb/home.html'
    # context_object_name='article_list' #默认值,可修改列表名
    def get_queryset(self):
        return Article.objects.order_by('-created_time')[:5]

class DetailView(generic.DetailView):
    model=Article
    template_name='wccweb/detail.html'

def vote(request,article_id):
    article=get_object_or_404(Article,pk=article_id)
    try:
        selected_choice=article.choice_set.get(pk=request.POST['choice'])
    except(KeyError,Choice.DoesNotExist):
        return render(request,'wccweb/detail.html',{
            'article':article,
            'error_message':"you did not select a choice.",
        })
    else:
        selected_choice.votes+=1
        selected_choice.save()
        return HttpResponseRedirect(reverse('wccweb:results',args=(article.id,)))

class ResultsView(generic.DetailView):
    model=Article
    template_name='wccweb/results.html'