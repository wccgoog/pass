# -*- coding: utf-8 -*-
"""
Created on Sun Feb 11 16:41:33 2018

@author: wccgo
"""

import socket
s=socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
for data in [b'Micheal',b'Tracy',b'Sarah']:
    s.sendto(data,('127.0.0.1',9999))
    print(s.recv(1024).decode('utf-8'))
s.close()