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
f=open('c:/users/administrator/desktop/diff.txt','w')
diff1_2=t1-t2
diff2_1=t2-t1
f.write('文件1独有requests\n')
for diff in diff1_2:
    f.write(diff+'\n')
f.write('\n文件2独有requests\n')
for diff in diff2_1:
    f.write(diff+'\n')
f.close()