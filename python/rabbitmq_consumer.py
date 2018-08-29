import pika,time,datetime
username = 'admin'
pwd = 'admin'
user_pwd = pika.PlainCredentials(username,pwd)
connection = pika.BlockingConnection(pika.ConnectionParameters('192.168.0.137',credentials=user_pwd))
channel = connection.channel()
channel.queue_declare(queue='hello')

def callback(ch,method,properties,body):
    print(body)
    print(datetime.datetime.now())
    ch.basic_ack(delivery_tag = method.delivery_tag)

channel.basic_qos(prefetch_count=1)  #逐条处理

def getmsg(qlist):
    for q in qlist:
        channel.basic_consume(callback,queue=q)
qlist = input("输入queue的名字,用'，'隔开")
qlist = qlist.split(',')
getmsg(qlist)

channel.start_consuming()
