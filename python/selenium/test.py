import time
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
driver=webdriver.Chrome()
driver.get('http://192.168.0.138:8010')
time.sleep(2)
driver.find_element_by_id('account').send_keys('admin')
driver.find_element_by_id('password').send_keys('m_admin')
# driver.maximize_window()