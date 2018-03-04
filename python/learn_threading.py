# -*- coding: utf-8 -*-
"""
Created on Sun Feb 11 14:53:08 2018

@author: wccgo
"""

#import threading,time
#count=0
#class Counter(threading.Thread):
#    def __init__(self,lock,threadName):
#        super(Counter,self).__init__(name=threadName)
#        self.lock=lock
#    def run(self):
#        global count
#        self.lock.acquire()
#        for i in range(10000):
#            count=count+1
#        self.lock.release()
#lock=threading.Lock()
#for i in range(5):
#    Counter(lock,'thread-'+str(i)).start()
#time.sleep(2)
#print(count)
    
########################################
import time,threading
def loop():
    print('thread %s is running...'%threading.current_thread().name)
    n=0
    while n<5:
        n=n+1
        print('thread %s >>> %s' %(threading.current_thread().name,n))
        time.sleep(1)
    print('thread %s ended.'%threading.current_thread().name)
print('thread %s is running...'%threading.current_thread().name)
t=threading.Thread(target=loop,name='LoopThread')
t.start()
t.join()
print('thread %s ended.'%threading.current_thread().name)
###########################################
import threading
local_school=threading.local()
def process_student():
    std=local_school.student
    print('Hello,%s(in %s)'%(std,threading.current_thread().name))
def process_thread(name):
    local_school.student=name
    process_student()
t1=threading.Thread(target=process_thread,args=('Alice',),name='Thread-A')
t2=threading.Thread(target=process_thread,args=('Bob',),name='Thread-B')
t1.start()
t2.start()
t1.join()
t2.join()