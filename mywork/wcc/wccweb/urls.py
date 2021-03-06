from django.urls import path
from . import views

app_name='wccweb'
urlpatterns=[
    path('',views.HomeView.as_view(),name='home'),
    path('<int:pk>/',views.DetailView.as_view(),name='detail'),
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    path('<int:article_id>/vote/', views.vote, name='vote'),
    path('signup/',views.signup,name='signup'),
    path('signin/',views.signin,name='signin'),
]