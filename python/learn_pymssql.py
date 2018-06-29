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


col_value='巡檢'
new_col_value='巡更'
col_name='wordingdesc01'
id_name='wordingid'
tablename='DMSWordingList'

def change_words(col_name,col_value,new_col_value,id_name,tablename):
    conn=pymssql.connect(host='172.16.133.65',user='sa',password='mds',database='IPMS4S_ZHMQ')
    cursor=conn.cursor()

    cursor.execute("select * from %s where %s like '%%%s%%'" %(tablename,col_name,col_value))
    words=cursor.fetchall()
    # print(words)
    #---------------------------------------------------------------------
    for i in words:
        x=i[2].replace(col_value,new_col_value)
        cursor.execute("update %s set %s='%s' where %s='%s'" %(tablename,col_name,x,id_name,i[0]))
        conn.commit()   #必须有！！！！
        print(x)

if __name__=='__main__':
    change_words(col_name,col_value,new_col_value,id_name,tablename)


#表有  
#T_FORM_FormTableReportItem（id，itemname)
#DMSWordingList(wordingId,繁体wordingdesc01,简体wordingdesc02)
#SystemFunction(sysfuncid,functiondesc)

    