import pymysql,xlrd
work = xlrd.open_workbook(r'C:\Users\wccgo\Desktop\wcc.xlsx')
data = work.sheets()[1]
conn=pymysql.connect(host='127.0.0.1',user='root',password='ztesoft',database='test',port=11111)
mysql=conn.cursor()
# u="91320191580485103K"
# p="2019-320161-64-03-515120"

for i in range(1,data.nrows):
    p=data.cell_value(i,0)
    u=data.cell_value(i,1)
    mysql.execute("update sg_bas_project set UNIFORM_CREDIT_CODE='"+ u + "' where PROJECT_CODE='"+p+"'")
conn.commit()
conn.close()