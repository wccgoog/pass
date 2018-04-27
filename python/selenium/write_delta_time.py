import datetime
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver=webdriver.Chrome()
driver.get('http://192.168.0.138:9998')   
driver.maximize_window()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'account')))
driver.find_element_by_id('account').send_keys('5815')   #账号
driver.find_element_by_id('password').send_keys('WW5815')   #密码
start=driver.find_element_by_css_selector('div.handler.handler_bg')
action=ActionChains(driver)
action.drag_and_drop_by_offset(start,250,0)
action.perform()
driver.find_element_by_id('loginbutton').click()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,"//table[@id='tabwindow_0']/tbody/tr/td[3]")))
driver.switch_to.frame(0)
time_start=datetime.datetime.now()#开始时间
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,"//div[@id='ListTable']/div[5]/div/div[5]/div[8]")))#表完全加载完成，随便选了其中一条的xpath
driver.find_element_by_id('btnAdd').click()
time_end=datetime.datetime.now()#结束时间
print(time_end-time_start)
