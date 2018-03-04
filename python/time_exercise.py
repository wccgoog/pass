# -*- coding: utf-8 -*-
"""
Created on Thu Jan 25 19:23:24 2018

@author: wccgo
"""

import datetime

def get_weekday():
    t=datetime.datetime.now()
    print('今天是',t.strftime('%A'))

#get_weekday()
    
def get_age():
    byear=int(input('输入年份'))
    bmon=int(input('月份'))
    bday=int(input('日'))
    birth=datetime.datetime(byear,bmon,bday)
    now=datetime.datetime.now()
    next_birth=datetime.datetime(now.year,bmon,bday)
    if now<=next_birth:
        age=now.year-byear-1
    else:
        age=now.year-byear
        next_birth.year+=1
    next_days=next_birth-now
    print('年龄:',age,'还有:',next_days,'过生日')
#get_age()

def double_day(year1,mon1,day1,year2,mon2,day2,n):
    birth1=datetime.datetime(year1,mon1,day1)
    birth2=datetime.datetime(year2,mon2,day2)
    if birth2<birth1:
        birth1,birth2=birth2,birth1
    delt=birth2-birth1
    once=birth2+1/(n-1)*delt
    print(once)
#double_day(1989,8,16,1990,4,4,5)