import pymysql,cx_Oracle
jdbc=cx_Oracle.connect('XZSPJBXQ/XZJSXZSP@10.196.109.221:1521/ORCL',encoding = "UTF-8",nencoding = "UTF-8")
oracle=jdbc.cursor()
conn=pymysql.connect(host='127.0.0.1',user='root',password='ztesoft',database='jbzw',port=11111)
mysql=conn.cursor()
# 查询旧库未办结件
oracle.execute("SELECT OFFICE_NUMBER from XJL_XZSP_APPLICATION where STATUS <> 4")
a=oracle.fetchall()
for i in a:
    # 查询新库
    mysql.execute("SELECT ID FROM sg_sp_work where COMMENTS='" + str(i[0]) + "'")
    unfinishedWork = mysql.fetchall()
    # 新库中有未办结件
    if unfinishedWork.__len__() > 0:
        mysql.execute("delete from sg_sp_work where COMMENTS='" + str(i[0]) + "'")
        print(i[0])
    else:
        continue
conn.commit()