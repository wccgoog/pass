root_path='C:/Users/wccgo/Desktop/'
txt_path=root_path+'123.txt'
f=open(txt_path,'r')
str=''
for line in f.readlines():
    str += line.strip()+','
print(str)