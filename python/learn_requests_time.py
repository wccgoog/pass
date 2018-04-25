# -*- coding: utf-8 -*-
import requests
import datetime
r=requests.get('https://github.com')
# print(r.text)
total_time=r.elapsed.seconds*1000000+r.elapsed.microseconds
print(total_time)
root_path='c:/users/wcc/desktop/1.txt'
f=open(root_path,'a')
f.write(str(total_time)+'\n')