import pika,time
username = 'admin'
pwd = 'admin'
user_pwd = pika.PlainCredentials(username,pwd)
connection = pika.BlockingConnection(pika.ConnectionParameters('127.0.0.1',credentials=user_pwd))
channel = connection.channel()

def product(n,qlist):
    for q in qlist:
        channel.queue_declare(queue=q)
        for i in range(n):
            channel.basic_publish(exchange='',routing_key=q,body='the ' + str(i+1) + 'th message from ' + q)
        print("[producer] send message to '%s' %s times" % (q,n))


qlist = input("输入queue的名字,用'，'隔开")
qlist = qlist.split(',')
product(5000,qlist)
connection.close()
input("按enter关闭")
