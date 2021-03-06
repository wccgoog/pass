import time,pymysql,cx_Oracle,urllib,json
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver=webdriver.Chrome()
driver.get('http://59.83.223.61:18088') 
driver.maximize_window()
driver.find_element_by_id('inputUserName').send_keys('fanxiaoyun')
driver.find_element_by_id('inputPassword').send_keys('123')
driver.find_element_by_id('btnLogin').click()

WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'portalDropdown')))
start=driver.find_element_by_id('portalDropdown')
start.click()
action=ActionChains(driver)
action.move_to_element_with_offset(start,0,140).click().perform()
WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@data-name="窗口办理"]')))
driver.find_element_by_xpath('//*[@data-name="窗口办理"]').click()
WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//td[@title="改变绿化规划、绿化用地的使用性质审批"][1]')))
driver.find_element_by_xpath('//td[@title="改变绿化规划、绿化用地的使用性质审批"][1]/div/div').click()
WebDriverWait(driver,10).until(EC.presence_of_all_elements_located((By.XPATH,'//td[@title="改变绿化规划、绿化用地的使用性质审批"][2]')))
driver.find_element_by_xpath('//td[@title="改变绿化规划、绿化用地的使用性质审批"][2]/following-sibling::*/div/button').click()