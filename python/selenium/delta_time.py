# -*- coding: utf-8 -*-
import datetime,time
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def write_delta_time(n):
    driver=webdriver.Chrome()
    driver.get('http://192.168.0.138:9998')   
    driver.maximize_window()
    WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'account')))
    driver.find_element_by_id('account').send_keys('5815')   #账号
    driver.find_element_by_id('password').send_keys('WW5815')   #密码
    start=driver.find_element_by_css_selector('div.handler.handler_bg')
    action=ActionChains(driver)
    action.drag_and_drop_by_offset(start,250,0)
    action.perform()    #拖动滑块
    driver.find_element_by_id('loginbutton').click()
    WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,"tabwindow_0")))
    f=open('C:/Users/Administrator/Desktop/time.txt','a')
    for i in range(n):
        for tab in driver.find_elements_by_css_selector('div.tab_close'):
            tab.click()
        driver.find_element_by_xpath("//ul[@id='jMenu']/li/a/span").click()
        driver.find_element_by_css_selector("li.jmenu-level-0 > ul > li > a > span").click()
        time_start=datetime.datetime.now()
        WebDriverWait(driver,30).until(EC.frame_to_be_available_and_switch_to_it(0))
        time.sleep(1)  #不加会报错
        WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,"//div[@id='ListTable']/div[5]/div/div[5]/div[8]")))
        time_end=datetime.datetime.now()
        time_total=time_end-time_start
        f.write(str(time_total)+'\n')
        driver.switch_to.default_content()
    f.close()

if __name__=='__main__':
    n=input('输入希望运行的次数： ')
    write_delta_time(int(n))