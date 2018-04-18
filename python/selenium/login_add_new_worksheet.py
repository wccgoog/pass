import time
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains

driver=webdriver.Chrome()
driver.get('http://192.168.0.138:9998')   
driver.maximize_window()
time.sleep(1.5)
driver.find_element_by_id('account').send_keys('5815')   #账号
driver.find_element_by_id('password').send_keys('WW5815')   #密码
start=driver.find_element_by_css_selector('div.handler.handler_bg')
action=ActionChains(driver)
action.drag_and_drop_by_offset(start,250,0)
action.perform()
driver.find_element_by_id('loginbutton').click()
time.sleep(9)
driver.switch_to.frame(0)
driver.find_element_by_id('btnAdd').click()
