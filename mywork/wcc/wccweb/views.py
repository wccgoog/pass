from django.shortcuts import render,HttpResponse,get_object_or_404,redirect
# Create your views here.
from .models import Article,Choice
from django.http import Http404,HttpResponse,HttpResponseRedirect
from django.urls import reverse
from django.views import generic
from .forms import SignupForm,LoginForm
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate,logout
from django.contrib.auth import login as auth_login

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

def signup(request):
    path=request.get_full_path()
    if request.method=='POST':
        form=SignupForm(data=request.POST,auto_id="%s")
        if form.is_valid():
            UserModel=get_user_model()
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user=UserModel.objects.create_user(username=username,email=email,password=password)
            user.save()
            auth_user = authenticate(username=username,password=password)
            auth_login(request,auth_user)            
            return redirect("wccweb/home.html")
    else:
        form=SignupForm(auto_id="%s")
    return render(request,'wccweb/signup.html',locals())

def signin(request):
    path=request.get_full_path()	
    if request.method =='POST':
        form = LoginForm(data=request.POST,auto_id="%s")			
        if form.is_valid():			
            data = form.clean()	
            user=authenticate(username= data['username'].strip(),password = data['password'])			
            auth_login(request,user)				
            return redirect("/")
    else:
        form = LoginForm(auto_id="%s")	
    return render(request,'wccweb/signin.html',locals())