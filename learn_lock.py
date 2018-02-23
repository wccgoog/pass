# -*- coding: utf-8 -*-
"""
Created on Sun Jan 28 11:59:03 2018

@author: wccgo
"""

import time,threading
balance=0
lock=threading.Lock()
def change_it(n):
    global balance
    balance+=n
    balance-=n
    time.sleep(0.1)
    print(n)
def run_thread(n):
    for i in range(10):
        lock.acquire()
        try:
            change_it(n)
        finally:
            lock.release()
t1 = threading.Thread(target=run_thread, args=(5,))
t2 = threading.Thread(target=run_thread, args=(8,))
t1.start()
t2.start()
#t1.join()
#t2.join()
print(balance)