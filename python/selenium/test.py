import time
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
driver=webdriver.Chrome()
driver.get('http://192.168.0.138:8010')
time.sleep(2)
driver.find_element_by_id('account').send_keys('admin')
driver.find_element_by_id('password').send_keys('m_admin')
start=driver.find_element_by_css_selector('div.handler.handler_bg')
action=ActionChains(driver)
action.drag_and_drop_by_offset(start,250,0)
action.perform()
driver.find_element_by_id('loginbutton').click()