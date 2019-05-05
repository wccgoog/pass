import pymysql,xlrd
work = xlrd.open_workbook(r'C:\Users\wccgo\Desktop\wcc.xlsx')
data = work.sheets()[1]
conn=pymysql.connect(host='127.0.0.1',user='root',password='ztesoft',database='jbzw',port=11111)
mysql=conn.cursor()
# u="91320191580485103K"
# p="2019-320161-64-03-515120"



for i in range(1,data.nrows):
    p=data.cell_value(i,0)
    industrycode=p.split("-")
    mysql.execute("update sg_bas_project set INDUSTRYCODE='"+ industrycode[2] + "' where PROJECT_CODE='"+p+"'")

# 修改信用代码
# for i in range(1,data.nrows):
#     p=data.cell_value(i,0)
#     u=data.cell_value(i,1)
#     mysql.execute("update sg_bas_project set UNIFORM_CREDIT_CODE='"+ u + "' where PROJECT_CODE='"+p+"'")

#修改用地面积
# for i in range(1,data.nrows):
#     p=data.cell_value(i,0)
#     area=data.cell_value(i,2)
#     area_add=data.cell_value(i,3)
#     area_ariculture=data.cell_value(i,4)
#     mysql.execute("update sg_bas_project set AREA='"+ str(area) + "',AREA_ADD='"+ str(area_add) +"',AREA_ARICULTURE='"+ str(area_ariculture) +"' where PROJECT_CODE='"+p+"'")


conn.commit()
conn.close()