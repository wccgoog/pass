# -*- coding: utf-8 -*-
import re
def read_log(log_name,txt_name,start_word,end_word):
    root_path='c:/users/administrator/desktop/'
    log_path=root_path+log_name+'.log'
    txt_path=root_path+txt_name+'.txt'
    f=open(log_path)
    long_str=''
    for line in f.readlines():
        long_str+=line
    f.close()
    p=start_word+'.*?'+end_word
    print('用于匹配的正则式为'+p)
    pattern=re.compile(p)
    requests=pattern.findall(long_str)
    print('匹配到的数量为',len(requests))
    f2=open(txt_path,'w')
    for request in requests:
        f2.write(request)
    f2.close()
    print('输出文件地址：'+txt_path)

if __name__=='__main__':
    log_name=input('输入log文件名:')
    txt_name=input('输出txt文件名:')
    read_log(log_name,txt_name,'{"DataType"','\\n') #正则