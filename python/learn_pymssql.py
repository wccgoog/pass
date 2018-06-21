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
cursor.execute("select * from DMSWordingList where WordingDesc01 like '%隱患%'")
words=cursor.fetchall()
for i in words:
    x=i[1].replace('隱患','故障')
    cursor.execute("update DMSWordingList set WordingDesc01='%s' where wordingid='%s'" %(x,i[0]))
    conn.commit()   #必须有！！！！

    