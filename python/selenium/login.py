import time
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains



driver=webdriver.Chrome()
driver.get('http://192.168.0.138:8010')
driver.maximize_window()
time.sleep(1.5)
driver.find_element_by_id('account').send_keys('admin')
driver.find_element_by_id('password').send_keys('m_admin')
start=driver.find_element_by_css_selector('div.handler.handler_bg')
action=ActionChains(driver)
action.drag_and_drop_by_offset(start,250,0)
action.perform()
driver.find_element_by_id('loginbutton').click()
time.sleep(1.5)
driver.find_element_by_css_selector('div.tab_close').click()
first_tag=driver.find_element_by_xpath("//ul[@id='jMenu']/li[1]")
# action.move_to_element(first_tag)
# action.perform()
first_tag.click()
driver.find_element_by_xpath('//ul[@id="jMenu"]/li/ul/li[5]/a/span').click()
