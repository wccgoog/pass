from django.contrib import admin

# Register your models here.
from .models import Article,Tag,Category,Question,Choice
class ChoiceInline(admin.TabularInline):
    model=Choice
    extra=3
class ArticleAdmin(admin.ModelAdmin):
    fieldsets=[
        (None,{'fields':['title']}),
        (None,{'fields':['author2']}),
        ('Date information',{'fields':['created_time','modified_time'],'classes':['collapse']}),
    ]
    inlines=[ChoiceInline]
    list_display=('title','content','created_time','author2')
    list_filter=['created_time']
    search_fields=['title','content']
class QuestionAdmin(admin.ModelAdmin):
    fieldsets=[
        (None,{'fields':['question_text']}),
        ('Date information',{'fields':['pub_date']}),
    ]
    list_display=('question_text','pub_date','was_published_recently')

admin.site.register(Article,ArticleAdmin)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Question,QuestionAdmin)
admin.site.register(Choice)