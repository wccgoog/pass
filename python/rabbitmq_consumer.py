import pika,time
username = 'admin'
pwd = 'admin'
user_pwd = pika.PlainCredentials(username,pwd)
connection = pika.BlockingConnection(pika.ConnectionParameters('127.0.0.1',credentials=user_pwd))
channel = connection.channel()
channel.queue_declare(queue='hello')
def callback(ch,method,properties,body):
    print("[consumer] recv %s" % body)
    # print(ch,method,properties,body)
# def recieve(n):
#     for i in range(n):
#         channel.basic_consume(callback,queue='hello',no_ack=True)
#     print("get %s msg." % n)
# while(1):
#     recieve(10)
#     time.sleep(1)
def getmsg(qlist):
    for q in qlist:
        channel.basic_consume(callback,queue=q,no_ack=True)
qlist = input("输入queue的名字")
qlist = qlist.split(',')
getmsg(qlist)
channel.start_consuming()
