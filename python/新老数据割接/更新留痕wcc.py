import time,pymysql,cx_Oracle,urllib,httplib2,json
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
#Oracle查询所有事项
jdbc=cx_Oracle.connect('XZSPJBXQ/XZJSXZSP@10.196.109.221:1521/ORCL',encoding = "UTF-8",nencoding = "UTF-8")
oracle=jdbc.cursor()
conn=pymysql.connect(host='127.0.0.1',user='root',password='ztesoft',database='jbzw',port=13306)
mysql=conn.cursor()
#oracle链接
#07a3e5c2c3ca49baa6ae46c2e97c7199城管环保审批办
#9a7c4229d22e449d8ec900162921f74e经济事务审批办
#4d3fc7f63e814d5790c4b299bc91c424投资项目审批办
oracle.execute("SELECT OFFICE_NUMBER from XJL_XZSP_APPLICATION where STATUS <> 4")
a=oracle.fetchall()
for i in a:
    mysql.execute("SELECT ID FROM sg_sp_work where COMMENTS='" + str(i[0]) + "'")
    unfinishedWork = mysql.fetchall()
    if unfinishedWork.__len__() > 0:
        mysql.execute("delete from sg_sp_work where COMMENTS='" + str(i[0]) + "'")
        print(i[0])
    else:
        continue
# conn.commit()