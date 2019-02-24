import xlrd
work = xlrd.open_workbook(r'C:\Users\wccgo\Desktop\oa生日.xls')
data = work.sheets()[0]
total = ''
totalName = ''
for i in range(1,data.nrows):
    if data.cell_value(i,7) == '':
        birthday = data.cell_value(i,1) + ':null'
        name = data.cell_value(i,1) + ':null'
    else:
        birthday = data.cell_value(i,1) + ':\'' + data.cell_value(i,7)[-6:-1] +'\''
        name = data.cell_value(i,1) + ':\'' + data.cell_value(i,0) +'\''
    total = total + birthday + ','
    totalName = totalName + name + ','
    i += 1
total = 'var birthdayData = {' + total + '}'
totalName = 'var birthdayNameData = {' + totalName + '}'
print(totalName)
jsFile = open(r'C:\Users\wccgo\Desktop\birthdayData.js','w',encoding='utf-8')
jsFile.write(total + '\n')
jsFile.write(totalName + '\n')
jsFile.close()
