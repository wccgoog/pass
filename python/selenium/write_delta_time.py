import datetime,time
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver=webdriver.Chrome()
driver.get('http://192.168.0.14:12300')   
driver.maximize_window()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'account')))
driver.find_element_by_id('account').send_keys('njmsnadmin')   #账号
driver.find_element_by_id('password').send_keys('M15&mds')   #密码
driver.find_element_by_id('loginbutton').click()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,"tabwindow_0")))
for tab in driver.find_elements_by_css_selector('div.tab_close'):
    tab.click()
driver.find_element_by_xpath("//ul[@id='jMenu']/li[4]/a/span").click()
driver.find_element_by_xpath("//ul[@id='jMenu']/li[4]/ul/li/a/span").click()
WebDriverWait(driver,30).until(EC.presence_of_all_elements_located((By.XPATH,"//table[@id='tabwindow_1']/tbody/tr/td[3]")))
WebDriverWait(driver,30).until(EC.frame_to_be_available_and_switch_to_it(0))
print(datetime.datetime.now())
# driver.find_element_by_xpath("//table[@id='tabwindow_1']/tbody/tr/td[3]").click()
# driver.switch_to.frame(0)
WebDriverWait(driver,30).until_not(EC.presence_of_all_elements_located((By.ID,"frameLoading")))
# WebDriverWait(driver,30).until(EC.element_to_be_clickable((By.ID,'btnFresh')))
# WebDriverWait(driver,30).until(EC.element_to_be_clickable((By.XPATH,"//div[@id='ListTable']/div[5]/div/div[5]/div[8]")))
print(datetime.datetime.now())
# time.sleep(3)
driver.find_element_by_xpath("//div[@id='ListTable']/div[5]/div/div[33]/div[7]").click()
print(datetime.datetime.now())
# driver.switch_to.frame(0)
# time_start=datetime.datetime.now()#开始时间
# WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,"//div[@id='ListTable']/div[5]/div/div[5]/div[8]")))#表完全加载完成，随便选了其中一条的xpath
# driver.find_element_by_id('btnAdd').click()
# time_end=datetime.datetime.now()#结束时间
# print(time_end-time_start)
