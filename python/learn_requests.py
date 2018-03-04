# -*- coding: utf-8 -*-
"""
Created on Wed Feb 21 18:29:36 2018

@author: wccgo
"""

import sqlite3
conn=sqlite3.connect('test.db')
cursor=conn.cursor()
cursor.execute('create table user (id varchar(20) primary key,name varchar(20))')
