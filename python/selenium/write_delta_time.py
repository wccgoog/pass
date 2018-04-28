# -*- coding: utf-8 -*-
import datetime,time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver=webdriver.Chrome()
driver.get('http://192.168.0.14:12300')   
driver.maximize_window()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'account')))
driver.find_element_by_id('account').send_keys('njmsnadmin')   #账号
driver.find_element_by_id('password').send_keys('M15&mds')   #密码
driver.find_element_by_id('loginbutton').click()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,"tabwindow_0")))
f=open('C:/Users/Administrator/Desktop/time.txt','a')
for i in range(3):
    for tab in driver.find_elements_by_css_selector('div.tab_close'):
        tab.click()
    driver.find_element_by_xpath("//ul[@id='jMenu']/li[4]/a/span").click()
    driver.find_element_by_xpath("//ul[@id='jMenu']/li[4]/ul/li/a/span").click()
    time_start=datetime.datetime.now()
    WebDriverWait(driver,30).until(EC.frame_to_be_available_and_switch_to_it(0))
    time.sleep(1.5)  #不加会报错
    WebDriverWait(driver,30).until(EC.element_to_be_clickable((By.XPATH,"//input[@type='checkbox']")))
    time_end=datetime.datetime.now()
    time_total=time_end-time_start
    f.write(str(time_total)+'\n')
    driver.switch_to.default_content()
f.close()
