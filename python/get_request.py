import re

def read_txt(txt_path,encoding='utf-8'):
    f=open(txt_path)
    t=[]
    p=r'^[GET,POST].*'
    pattern=re.compile(p)
    for line in f.readlines():
        line=line.strip()
        request=pattern.findall(line)
        if request:
            t.append(line)
    return set(t)

t1=read_txt('c:/users/administrator/desktop/1.txt')
t2=read_txt('c:/users/administrator/desktop/2.txt')
print(t1)