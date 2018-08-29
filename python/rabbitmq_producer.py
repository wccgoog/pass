import pika,time,datetime
username = 'admin'
pwd = 'admin'
user_pwd = pika.PlainCredentials(username,pwd)  #127.0.0.1 192.168.0.137
connection = pika.BlockingConnection(pika.ConnectionParameters('127.0.0.1',credentials=user_pwd))
channel = connection.channel()

def product(n,qlist):
    for q in qlist:
        start_time = datetime.datetime.now()
        channel.queue_declare(queue=q)
        for i in range(n):
            channel.basic_publish(exchange='',routing_key=q,body='the ' + str(i+1) + 'th message from ' + q)
        print("[producer] send message to '%s' %s times" % (q,n))
        end_time = datetime.datetime.now()
        print(end_time - start_time)


qlist = input("输入queue的名字,用'，'隔开")
qlist = qlist.split(',')
product(1000,qlist)
connection.close()

input("按enter关闭")
