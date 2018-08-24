import pika
username = 'admin'
pwd = 'admin'
user_pwd = pika.PlainCredentials(username,pwd)
connection = pika.BlockingConnection(pika.ConnectionParameters('192.168.0.137',credentials=user_pwd))
channel = connection.channel()
channel.queue_declare(queue='hello')
channel.basic_publish(exchange='',routing_key='hello',body='hello world')
print("[producer] send 'hello world'")
connection.close()