import re

def read_txt(txt_path,encoding='utf-8'):
    f=open(txt_path)
    t=[]
    for line in f.readlines():
        line=line.strip()
        t.append(line)
    return set(t)


def show_diff(txt1_path,txt2_path,diff_path):
    t1=read_txt(txt1_path)
    t2=read_txt(txt2_path)
    f=open(diff_path,'w')
    diff1_2=t1-t2
    diff2_1=t2-t1
    f.write('文件1独有requests\n\n')
    for diff in diff1_2:
        f.write(diff+'\n')
    f.write('\n\n文件2独有requests\n\n')
    for diff in diff2_1:
        f.write(diff+'\n')
    f.close()

if __name__=='__main__':
    txt_name_1=input('文件1名称')
    txt_name_2=input('文件2名称')
    show_diff('c:/users/administrator/desktop/'+txt_name_1+'.txt','c:/users/administrator/desktop/'+txt_name_2+'.txt','c:/users/administrator/desktop/'+txt_name_1+'与'+txt_name_2+'的差别'+'.txt')