import xlrd
work = xlrd.open_workbook(r'C:\Users\wccgo\Desktop\oa生日.xls')
data = work.sheets()[0]
total = ''
for i in range(1,data.nrows):
    if data.cell_value(i,7) == '':
        a = data.cell_value(i,1) + ':null'
    else:
        a = data.cell_value(i,1) + ':\'' + data.cell_value(i,7)[-6:-1] +'\''
    total = total + a + ','
    i += 1
total = 'var birthdayData = {' + total + '}'
print(total)
jsFile = open(r'C:\Users\wccgo\Desktop\birthdayData.js','w')
jsFile.write(total)
jsFile.close()
