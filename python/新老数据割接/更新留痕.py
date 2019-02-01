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
oracle.execute("SELECT XZSPJBXQ.XJL_XZSP_APPLICATION.OFFICE_NUMBER FROM XZSPJBXQ.XJL_XZSP_APPLICATION ,XZSPJBXQ.XJL_XZSP_CONCLUDED WHERE XZSPJBXQ.XJL_XZSP_APPLICATION.OFFICE_NUMBER = XZSPJBXQ.XJL_XZSP_CONCLUDED.OFFICE_NUMBER")
a=oracle.fetchall()
for i in a:
    #根据办件编号查询老系统
    oracle.execute("SELECT XZSPJBXQ.XJL_XZSP_APPROVE.USER_NAME,XZSPJBXQ.XJL_XZSP_APPLICATION.CASEFLOW_ID,XZSPJBXQ.XJL_XZSP_APPROVE.APPROVE_OPINION,XZSPJBXQ.XJL_XZSP_APPROVE.APPROVE_TIME FROM XZSPJBXQ.XJL_XZSP_APPLICATION , XZSPJBXQ.XJL_XZSP_CONCLUDED , XZSPJBXQ.XJL_XZSP_APPROVE  WHERE XZSPJBXQ.XJL_XZSP_APPLICATION.OFFICE_NUMBER = XZSPJBXQ.XJL_XZSP_CONCLUDED.OFFICE_NUMBER AND XZSPJBXQ.XJL_XZSP_APPLICATION.CASEFLOW_ID = XZSPJBXQ.XJL_XZSP_APPROVE.CASEFLOW_ID AND XZSPJBXQ.XJL_XZSP_APPLICATION.OFFICE_NUMBER = '"+str(i[0])+"'")
    liuhen=oracle.fetchall()
    #根据办件编号查询新系统
    mysql.execute("SELECT sg_sp_work_link_info.END_TIME, sg_sp_work_link_info.ID,sg_sp_work_link_info.USER_NAME  FROM sg_sp_work ,sg_sp_work_link_info WHERE sg_sp_work.ID = sg_sp_work_link_info.WORK_ID AND sg_sp_work.COMMENTS='"+str(i[0])+"'")
    msqlliu=mysql.fetchall()
    print(liuhen)
    print('------------------------------')
    print(msqlliu)
    if liuhen.__len__() <= msqlliu.__len__():
        for i in range(liuhen.__len__()):
            # print(i)
            # print(liuhen[i][0],liuhen[i][3],msqlliu[i][1])
            url1= "UPDATE jbzw.sg_sp_work_link_info SET END_TIME='"+str(liuhen[i][3])+"', USER_NAME='"+str(liuhen[i][0])+"' WHERE ID='"+str(msqlliu[i][1])+"'"
            print(url1)
            # mysql.execute(url1)
            # conn.commit()
        for i in range(liuhen.__len__(),msqlliu.__len__()):
            # print(liuhen[liuhen.__len__()-1][0],liuhen[liuhen.__len__()-1][3],msqlliu[i][1])
            url2= "UPDATE jbzw.sg_sp_work_link_info SET END_TIME='"+str(liuhen[liuhen.__len__()-1][3])+"', USER_NAME='"+str(liuhen[liuhen.__len__()-1][0])+"' WHERE ID='"+str(msqlliu[i][1])+"'"
            print(url2)

