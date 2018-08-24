import pika
username = 'admin'
pwd = 'admin'
user_pwd = pika.PlainCredentials(username,pwd)
connection = pika.BlockingConnection(pika.ConnectionParameters('192.168.0.137',credentials=user_pwd))
channel = connection.channel()
channel.queue_declare(queue='hello')
def callback(ch,method,properties,body):
    print("[consumer] recv %s" % body)
channel.basic_consume(callback,queue='hello',no_ack=True)
print("[consumer] waiting for msg .")
channel.start_consuming()