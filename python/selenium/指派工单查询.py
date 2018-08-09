from selenium.webdriver.common.keys import Keys
import time
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
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,"//div[@id='ListTable']/div[5]/div/div[5]/div[8]")))
driver.find_element_by_id('btnFilter').click()

WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,"ui-multiselect-QCreater-option-56")))
# driver.find_element_by_id("ui-multiselect-QCreater-option-56").click()  # 报错：Message: element not visible，所以决定用js
driver.execute_script('document.getElementById("ui-multiselect-QCreater-option-56").click()')  #填写人
# driver.execute_script('document.getElementById("ui-multiselect-QPROP_CLR-option-55").click()')  #处理人
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,"ui-multiselect-QUserName-option-181")))
driver.execute_script('document.getElementById("ui-multiselect-QUserName-option-181").click()')  #项目

# driver.find_element_by_id("ui-multiselect-QCreater-option-0").click()
# WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,"//div[27]/div/ul/li/a/span[2]")))
# driver.find_element_by_xpath("//div[27]/div/ul/li/a/span[2]").click()
# driver.find_element_by_id("id=ui-multiselect-QCreater-option-0").click()
# driver.find_element_by_xpath(written_by).send_keys('王晨驰')  #填写人
# driver.find_element_by_xpath(written_by).send_keys(Keys.ENTER)
# driver.find_element_by_xpath("//div[@id='FilterPage']/table/tbody/tr[5]/th").click()
# driver.find_element_by_xpath('//div[@id="FilterPage"]/table/tbody/tr[6]/td/div/div/input').send_keys('中华')  
# driver.find_element_by_xpath('//div[@id="FilterPage"]/table/tbody/tr[6]/td/div/div/input').send_keys(Keys.ENTER)
driver.find_element_by_xpath("(//button[@type='button'])[14]").click()

