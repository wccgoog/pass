import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 读文件获取列表
log_path='c:/users/wccgo/desktop/b.txt'
f=open(log_path)
windowNames=[]
for line in f.readlines():
    line=line.strip()
    windowNames.append(line)
f.close()
print(windowNames)

#打开浏览器登录
driver=webdriver.Chrome()
driver.get('http://59.83.223.61:18088') 
driver.maximize_window()
driver.find_element_by_id('inputUserName').send_keys('superadmin')
driver.find_element_by_id('inputPassword').send_keys('11')
driver.find_element_by_id('btnLogin').click()

WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@data-name="数据字典管理"]')))
driver.find_element_by_xpath('//*[@data-name="数据字典管理"]').click()

WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'//li[@data-page="2"]')))
driver.find_element_by_xpath('//li[@data-page="2"]').click()

WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'//td[@title="窗口监查窗口B"]')))
driver.find_element_by_xpath('//td[@title="窗口监查窗口B"]').click()

i=1

for name in windowNames:
    WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'ui-id-52_pager_left')))
    driver.find_element_by_id('ui-id-52_pager_left').click()

    WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'//input[@name="valueName"]')))
    driver.find_element_by_xpath('//input[@name="valueName"]').send_keys(name)
    driver.find_element_by_xpath('//input[@name="valueCode"]').send_keys(i)
    driver.find_element_by_xpath('//input[@name="valueCode"]/../../td/div/div[@title="提交"]/span').click()
    time.sleep(1)
    i+=1
    print(name)
    print(i)