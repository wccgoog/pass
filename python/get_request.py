import re

def read_txt(txt_path,encoding='utf-8'):
    f=open(txt_path)
    t=[]
    for line in f.readlines():
        line=line.strip()
        t.append(line)
    return set(t)

t1=read_txt('c:/users/administrator/desktop/1.txt')
t2=read_txt('c:/users/administrator/desktop/2.txt')
print(t1-t2,'\n'*3,t2-t1)