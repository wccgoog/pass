import time
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver=webdriver.Chrome()
driver.get('http://192.168.0.138:8010')
driver.maximize_window()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'account')))
driver.find_element_by_id('account').send_keys('admin')
driver.find_element_by_id('password').send_keys('m_admin')
start=driver.find_element_by_css_selector('div.handler.handler_bg')
action=ActionChains(driver)
action.drag_and_drop_by_offset(start,250,0)
action.perform()
driver.find_element_by_id('loginbutton').click()
time.sleep(1.5)
driver.find_element_by_css_selector('div.tab_close').click()
first_tag=driver.find_element_by_xpath("//ul[@id='jMenu']/li[1]")  #断点1
for i in range(1,6):
    first_tag.click()
    driver.find_element_by_xpath(
        '//ul[@id="jMenu"]/li/ul/li['+str(i)+']'
        ).click()
    time.sleep(3)
driver.find_element_by_xpath(
    '//table[@id="tabwindow_4"]/tbody/tr/td[3]'
    ).click()
driver.switch_to.frame(3)
driver.find_element_by_id('btnFilter').click()
time.sleep(2)
driver.find_element_by_xpath("(//button[@type='button'])[5]").click()
driver.switch_to.default_content()
for tab in driver.find_elements_by_css_selector('div.tab_close'):
    tab.click()
    time.sleep(1.5)    #断点1
second_tag=driver.find_element_by_xpath("//ul[@id='jMenu']/li[2]")   #断点2
second_tag_1=driver.find_element_by_xpath("//ul[@id='jMenu']/li[2]/ul/li")
second_tag.click()
second_tag_1.click()
driver.find_element_by_xpath("//ul[@id='jMenu']/li[2]/ul/li/ul/li").click()
time.sleep(4)
if driver.switch_to_alert():
    driver.switch_to_alert().accept()
for i in range(6):
    second_tag.click()
    driver.find_element_by_xpath("//ul[@id='jMenu']/li[2]/ul/li[1]").click()
    driver.find_element_by_xpath("//ul[@id='jMenu']/li[2]/ul/li[1]/ul/li["+str(i+2)+"]").click()
    time.sleep(3)

