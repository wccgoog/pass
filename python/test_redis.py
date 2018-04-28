import redis
r=redis.Redis(host='127.0.0.1',port=6379)
f=open('C:/Users/Administrator/Desktop/1.txt')  #提取出来的json
for line in f.readlines():
    line=line.strip()
    r.lpush('f2',line)
f.close()
