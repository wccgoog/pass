import re

def read_json(har_path,txt_path,start_word,end_word):
    f=open(har_path,encoding='utf-8')
    long_str=''
    for line in f.readlines():
        line=line.strip()
        long_str+=line
    f.close()
    p='(?<='+start_word+')'+'.*?(?=,'+end_word+')'
    print('用于匹配的正则式为'+p)
    pattern=re.compile(p)
    requests=pattern.findall(long_str)
    print('request数量为',len(requests))
    f2=open(txt_path,'w')
    for request in requests:
        f2.write(request+'\n')
    f2.close()

if __name__=='__main__':
    har_name=input('输入.har文件名')
    txt_name=input('输出.txt文件名')
    read_json('c:/users/administrator/desktop/'+har_name+'.har','c:/users/administrator/desktop/'+txt_name+'.txt','"request": {','"httpVersion"') #正则，起始和结尾参数字符需要单引号加双引号'+"

