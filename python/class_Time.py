# -*- coding: utf-8 -*-
"""
Created on Fri Jan 26 12:54:21 2018

@author: wccgo
"""

class Time():
    def __init__(self,hour=0,minute=0,second=0):    
        self.hour=hour
        self.minute=minute
        self.second=second
    def __str__(self):
        return '%02d:%02d:%05.2f'%(self.hour,self.minute,self.second)  #t=Time print(t)有效
    def __add__(self,other):
        if isinstance(other,Time):
            return self.add_time(other)
        else:
            return self.increment(other)
    def __radd__(self,other):
        return self.__add__(other)
    def add_time(self,other):
        seconds=self.time_to_int()+other.time_to_int()
        return Time.int_to_time(seconds)
#    def print_time(self):
#        print('%02d:%02d:%05.2f'%(self.hour,self.minute,self.second))
    def time_to_int(self):
        minutes=self.hour*60+self.minute
        seconds=minutes*60+self.second
        return seconds
    def int_to_time(seconds):
        time=Time()
        minutes,time.second=divmod(seconds,60)
        time.hour,time.minute=divmod(minutes,60)
        return time
    def increment(self,seconds):
        seconds+=self.time_to_int()
        return Time.int_to_time(seconds)
    def __lt__(self,other):
        return (self.hour,self.minute,self.second)<(other.hour,other.minute,other.second)
    


#t=Time(3,2,1)
#print(t+1334)