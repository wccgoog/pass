import time,pymysql,cx_Oracle,urllib,json,os,time
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 查询材料
conn=pymysql.connect(host='127.0.0.1',user='root',password='ztesoft',database='jbzw',port=13306)
mysql=conn.cursor()
mysql.execute('select name from sg_item_materials_repo')
names=mysql.fetchall()
m=[]

for i in names:
    m.append(i[0])
# m为材料列表
x=[]
for root, dirs, files in os.walk('C:\\Users\\wccgo\\Desktop\\城管环保办事项材料'): 
    x+=files
# x为带上传材料列表
driver=webdriver.Chrome()
driver.get('http://59.83.223.61:18088') 
driver.maximize_window()
driver.find_element_by_id('inputUserName').send_keys('fanxiaoyun')
driver.find_element_by_id('inputPassword').send_keys('123')
driver.find_element_by_id('btnLogin').click()
# 登录
# 进入材料库
WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@data-name="材料目录库"]')))
driver.find_element_by_xpath('//*[@data-name="材料目录库"]').click()
WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@id="ui-id-18_pager_left"]/div/button[1]')))
for i in x:
    name=i.split('.')
    print(name)
    # 不在材料库中
    if name[0] not in m:
        print(i)
        driver.find_element_by_xpath('//*[@id="ui-id-18_pager_left"]/div/button[1]').click()
        WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//input[@data-rule="名称:required;length[1~400, true]"]')))
        driver.find_element_by_xpath('//input[@data-rule="名称:required;length[1~400, true]"]').send_keys(name[0])
        WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//textarea[@data-rule="受理标准:required;length[~1000]"]')))
        driver.find_element_by_xpath('//textarea[@data-rule="受理标准:required;length[~1000]"]').send_keys(name[0])
        WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//textarea[@data-rule="法律依据:required;length[~1000]"]')))
        driver.find_element_by_xpath('//textarea[@data-rule="法律依据:required;length[~1000]"]').send_keys(name[0])
        WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.ID,'fileuploadA')))
        driver.find_element_by_id('fileuploadA').send_keys('C:\\Users\\wccgo\Desktop\\城管环保办事项材料\\' + i)
        time.sleep(1)
        WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//button[@class="btn btn_minwidth btn-primary js-ok"]')))
        driver.find_element_by_xpath('//button[@class="btn btn_minwidth btn-primary js-ok"]').click()
        time.sleep(1)
    else:
        continue
    