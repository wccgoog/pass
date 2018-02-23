# -*- coding: utf-8 -*-
"""
Created on Fri Jan 26 16:16:25 2018

@author: wccgo
"""

class Time():
    def __init__(self,seconds=0):
        self.seconds=seconds
    def __str__(self):
        minute,second=divmod(self.seconds,60)
        hour,minute=divmod(minute,60)
        return '%02d:%02d:%05.2f'%(hour,minute,second)
    def is_after(self,other):
        if self.seconds>other.seconds:
            return True
        return False
    def __add__(self,other):
        t=Time()
        if isinstance(other,Time):        
            t.seconds=self.seconds+other.seconds
            return t
        else:
            t.seconds=self.seconds+other
            return t
    def __radd__(self,other):
        return self.__add__(other)

#t1=Time(1000)
#t2=Time(20)
#print(t2+100+t1)