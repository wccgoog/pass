import pika,time
username = 'admin'
pwd = 'admin'
user_pwd = pika.PlainCredentials(username,pwd)
connection = pika.BlockingConnection(pika.ConnectionParameters('192.168.0.137',credentials=user_pwd))
channel = connection.channel()
channel.queue_declare(queue='hello')

def callback(ch,method,properties,body):
    print(body)
    # time.sleep(0.01)


def getmsg(qlist):
    for q in qlist:
        channel.basic_consume(callback,queue=q,no_ack=True)
qlist = input("输入queue的名字,用'，'隔开")
qlist = qlist.split(',')
getmsg(qlist)
channel.start_consuming()
