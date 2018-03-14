from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.template import RequestContext
import datetime,bleach
from django.contrib.auth import authenticate,login as auth_login ,logout 
from blog.forms import SignupForm,LoginForm
from django.contrib.auth import get_user_model
from blog.models import Article


# Create your views here.
def home(request):
	time = datetime.datetime.now()	
	
	return render(request,'index.html',locals())

def about(request):
	
	return render(request,'about.html',locals())

def login(request):
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
		
	return render(request,'login.html',locals())

def post(request):
	path=request.get_full_path()
	user=request.user	
	title=request.POST.get("title",False)
	content=request.POST.get("content",False)
	tags=["p",'a','img','b']
	attrs={
		'a':['href','rel','target'],
		'img':['alt','src','width','height']
	}
	content=bleach.clean(content,tags,attrs)
	if request.method=="POST" and content and title:
		post=Article.objects.create(title=title,zhuozhe=user,content=content,is_show=True)
		return redirect("/")
	return render(request,'post.html',locals())

def blog(request):
	bloglist=Article.objects.filter(is_show=True)
	return render(request,"blog.html",locals())

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
			return redirect("home")
	else:
		form=SignupForm(auto_id="%s")
	return render(request,'signup.html',locals())


def logout_view(request):
	logout(request)
	return redirect('home')



