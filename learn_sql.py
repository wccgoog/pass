# -*- coding: utf-8 -*-
"""
Created on Wed Feb 21 18:29:36 2018

@author: wccgo
"""

import sqlite3
#conn=sqlite3.connect('test.db')
#cursor=conn.cursor()
##cursor.execute('create table user (id varchar(20) primary key,name varchar(20))')
#cursor.execute(' insert into user (id,name) values (1,\'Michael\')')
#print(cursor.rowcount)
#cursor.execute('select * from user where id=?',('1',))
#values=cursor.fetchall()
#print(values)
#cursor.close()
#conn.close()
# 初始数据:
conn = sqlite3.connect('test1.db')
cursor = conn.cursor()
#cursor.execute('create table user(id varchar(20) primary key, name varchar(20), score int)')
#cursor.execute(r"insert into user values ('001', 'Adam', 95)")
#cursor.execute(r"insert into user values ('002', 'Bart', 62)")
#cursor.execute(r"insert into user values ('003', 'Lisa', 78)")
def get_score_in(low, high):
   # ' 返回指定分数区间的名字，按分数从低到高排序 '
    cursor.execute('select * from user where score>=? and score <=?' , (low,high))
    t=cursor.fetchall()
    t=sorted(t,key=lambda x:x[2])
    s=[]
    for i in t:
        s.append(i[1])
    return s
# 测试:
assert get_score_in(80, 95) == ['Adam'], get_score_in(80, 95)
assert get_score_in(60, 80) == ['Bart', 'Lisa'], get_score_in(60, 80)
assert get_score_in(60, 100) == ['Bart', 'Lisa', 'Adam'], get_score_in(60, 100)
cursor.close()
conn.commit()
conn.close()
print('Pass')