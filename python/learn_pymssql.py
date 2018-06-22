import pymssql
# conn=pymssql.connect(host='172.16.133.65',user='sa',password='mds',database='IPMS4S_XTGAS_2018')
# cursor=conn.cursor()
# cursor.execute("SELECT NAME FROM SYSOBJECTS WHERE TYPE='U'")
# tables=cursor.fetchall()
# count=0
# for (i,) in tables:
#     cursor.execute("select column_name from information_schema.columns where table_name ='%s'" %i)
#     cols=cursor.fetchall()
#     if ('WorkState',)not in cols:
#         # cursor.execute("alter table %s add WorkState varchar(100)" %i)
#         print(i+'!!!')
#     else:
#         count+=1
# print(count)

conn=pymssql.connect(host='172.16.133.65',user='sa',password='mds',database='IPMS4S_ZHMQ')
cursor=conn.cursor()
tablename='T_FORM_FormTableReportItem'
cursor.execute("select * from %s where ItemName like '%%隱患%%'" %tablename)
words=cursor.fetchall()
# print(words)


col_name=''
id_name=''
#---------------------------------------------------------------------
for i in words:
    x=i[2].replace('隱患','故障')
    cursor.execute("update %s set %s='%s' where %s='%s'" %(tablename,col_name,x,id_name,i[0]))
    conn.commit()   #必须有！！！！
    print(x)


    