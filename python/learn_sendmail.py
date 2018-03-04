# -*- coding: utf-8 -*-
"""
Created on Sun Jan 28 11:59:03 2018

@author: wccgo
"""

from email.header import Header
from email import encoders
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import parseaddr, formataddr
from email.mime.multipart import MIMEMultipart
import smtplib

def _format_addr(s):
    name, addr = parseaddr(s)
    return formataddr((Header(name, 'utf-8').encode(), addr))

from_addr = 'wcc3@sina.com'
password = 'wcc123456789'
to_addr = '544273787@qq.com,75095235@qq.com' #模拟input()
smtp_server = 'smtp.sina.com'

msg=MIMEMultipart()
msg.attach(MIMEText('<html><body><h1>Hello</h1>'
               +'<p>send by<a href="http://www.python.org">Python</a>...</p>'
               +'<p><img src="cid:0"></p>'
               +'</body></html>','html', 'utf-8'))
msg['From'] = _format_addr('get this  <%s>' % from_addr)
#不需设置msg['To']
msg['Subject'] = Header('疯狂测试中……', 'utf-8').encode()
with open('blur.jpg','rb') as f:
    mime=MIMEBase('image','jpg',filename='blur.jpg')
    mime.add_header('Content-Disposition','attachment',filename='blur.jpg')
    mime.add_header('Content-ID','<0>')
    mime.add_header('X-Attachment-Id','0')
    mime.set_payload(f.read())
    encoders.encode_base64(mime)
    msg.attach(mime)
server = smtplib.SMTP(smtp_server, 25)
server.set_debuglevel(1)
server.login(from_addr, password)
server.sendmail(from_addr,to_addr.split(','), msg.as_string())
server.quit()

