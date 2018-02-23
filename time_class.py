# -*- coding: utf-8 -*-
"""
Created on Thu Jan 25 13:54:20 2018

@author: wccgo
"""
class Time():
    '''
    '''
    
def print_time(time):
    print('%02d:%02d:%05.2f'%(time.hour,time.minute,time.second))
    
    
#time=Time()
#time.hour=1
#time.minute=29
#time.second=33
#print_time(time)

def is_after(t1,t2):
    return (t1.hour,t1.minute,t1.second)<(t2.hour,t2.minute,t2.second)

#def increment(time,seconds):     
    '''这是修改器'''
#    time.minute+=seconds//60
#    time.second+=seconds%60
#    time.hour+=time.minute//60
#    time.minute=time.minute%60

def increment(time,seconds):
    '''纯函数'''
    time1=Time()
    time1.second=time.second+seconds
    time1.minute=time.minute+time1.second//60
    time1.second=time1.second%60
    time1.hour=time.hour+time1.minute//60
    time1.minute=time1.minute%60
    return time1

#time2=increment(time,9190)
#print_time(time2)

def time_to_int(time):
    minutes=time.hour*60+time.minute
    seconds=minutes*60+time.second
    return seconds

def int_to_time(seconds):
    time=Time()
    minutes,time.second=divmod(seconds,60)
    time.hour,time.minute=divmod(minutes,60)
    return time

def add_time(t1,t2):
    seconds=time_to_int(t1)+time_to_int(t2)
    return int_to_time(seconds)


#t=add_time(time,time2)
#print_time(t)
    
def mul_time(time,n):
    seconds=time_to_int(time)*n
    return int_to_time(seconds)

def avarage_time(time,n):
    return mul_time(time,1/n)
