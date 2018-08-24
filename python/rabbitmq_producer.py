import pika,time
username = 'admin'
pwd = 'admin'
user_pwd = pika.PlainCredentials(username,pwd)
connection = pika.BlockingConnection(pika.ConnectionParameters('192.168.0.137',credentials=user_pwd))
channel = connection.channel()

def product(n,qlist):
    for q in qlist:
        print(q)
        channel.queue_declare(queue=q)
        for i in range(n):
            channel.basic_publish(exchange='',routing_key=q,body='hello world')
        print("[producer] send 'hello world' to '%s' %s times" % (q,n))


qlist = input("输入queue的名字,用，隔开")
qlist = qlist.split(',')
product(100,qlist)
connection.close()
input("输入任意键关闭")