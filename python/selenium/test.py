import time,pymysql,cx_Oracle,urllib,json
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver=webdriver.Chrome()
driver.get('http://59.83.223.61:18081') 
driver.maximize_window()
driver.find_element_by_id('inputUserName').send_keys('xumin')
driver.find_element_by_id('inputPassword').send_keys('123')
driver.find_element_by_id('btnLogin').click()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'outAndOver')))
driver.find_element_by_xpath("(//div[@id='outAndOver'])[2]").click() 
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'btnAddItem')))
driver.find_element_by_xpath("(//*[@id='btnAddItem'])").click()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'/html/body/div[4]/div[2]/div/div[1]/form[1]/div[3]/div[1]/div/span/span')))
start=driver.find_element_by_xpath('/html/body/div[4]/div[2]/div/div[1]/form[1]/div[3]/div[1]/div/span/span')
start.click()
action=ActionChains(driver)
action.move_to_element_with_offset(start,0,100).click().perform()