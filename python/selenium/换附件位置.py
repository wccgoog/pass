import time,pymysql,cx_Oracle,urllib,json,os,time
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

x=[]
for root, dirs, files in os.walk('C:\\Users\\wccgo\\Desktop\\投资审批办事项材料'): 
    x+=files
# x为带上传材料列表
driver=webdriver.Chrome()
driver.get('http://59.83.223.61:18088') 
driver.maximize_window()
driver.find_element_by_id('inputUserName').send_keys('xumin')
driver.find_element_by_id('inputPassword').send_keys('123')
driver.find_element_by_id('btnLogin').click()
# 登录
# 进入材料库
WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@data-name="材料目录库"]')))
driver.find_element_by_xpath('//*[@data-name="材料目录库"]').click()
WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@id="ui-id-18_pager_left"]/div/button[1]')))
for i in x:
    name=i.split('.')
    print(i)
    WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@id="PORTAL_DIV_MENU_74"]/div/div[1]/form/div[1]/div/div/input')))
    driver.find_element_by_xpath('//*[@id="PORTAL_DIV_MENU_74"]/div/div[1]/form/div[1]/div/div/input').send_keys(name[0])
    driver.find_element_by_xpath('//input[@value="查询"]').click()
    time.sleep(1)
    driver.find_element_by_xpath('//td[@title=\"' + name[0] + '\"]').click()
    driver.find_element_by_xpath('//*[@id="ui-id-18_pager_left"]/div/button[2]').click()
    WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.ID,'fileuploadT')))
    if driver.find_element_by_class_name('del-attach').is_displayed():
        driver.find_element_by_class_name('del-attach').click()
        time.sleep(1)
    if driver.find_element_by_class_name('del-temp').is_displayed():
        pass
    else:
        driver.find_element_by_id('fileuploadT').send_keys('C:\\Users\\wccgo\Desktop\\投资审批办事项材料\\' + i)
        time.sleep(3)
    WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.XPATH,'//button[@class="btn btn_minwidth btn-primary js-ok"]')))
    driver.find_element_by_xpath('//button[@class="btn btn_minwidth btn-primary js-ok"]').click()
    time.sleep(1)
    WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.XPATH,'//input[@value="重置"]')))
    driver.find_element_by_xpath('//input[@value="重置"]').click()