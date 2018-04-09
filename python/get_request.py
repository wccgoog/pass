def read_txt(txt_path,encoding='utf-8'):
    f=open(txt_path)
    t=[]
    for line in f.readlines():
        line=line.strip()
        t.append(line)
    return set(t)

def show_diff(txt_name_1,txt_name_2):
    root_path='c:/users/administrator/desktop/'
    txt1_path=root_path+txt_name_1+'.txt'
    txt2_path=root_path+txt_name_2+'.txt'
    t1=read_txt(txt1_path)
    t2=read_txt(txt2_path)
    diff_path=root_path+txt_name_1+'与'+txt_name_2+'的差别'+'.txt'
    f=open(diff_path,'w')
    diff1_2=t1-t2
    diff2_1=t2-t1
    comms=t1&t2
    print('<<'+txt_name_1+'>>独有requests:',len(diff1_2))
    print('<<'+txt_name_2+'>>独有requests:',len(diff2_1))
    print('共有requests',len(comms))
    f.write('<<'+txt_name_1+'>>独有requests'+str(len(diff1_2))+'\n\n')
    for diff in diff1_2:
        f.write(diff+'\n')
    f.write('\n\n<<'+txt_name_2+'>>独有requests'+str(len(diff2_1))+'\n\n')
    for diff in diff2_1:
        f.write(diff+'\n')
    f.write('\n\n共有requests'+str(len(comms))+'\n\n')
    for comm in comms:
        f.write(comm+'\n')
    f.close()
    print('输出文件地址：'+diff_path)

if __name__=='__main__':
    txt_name_1=input('文件1名称:')
    txt_name_2=input('文件2名称:')
    show_diff(txt_name_1,txt_name_2)