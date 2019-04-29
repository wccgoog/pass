import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# driver=webdriver.Chrome()
# driver.get('http://59.83.223.61:18088') 
# driver.maximize_window()
projectName="041803"
# 9部门工号为032923-032931
account = 32923
# visit = [32924,32927,32928]
for i in range(account,32932):
    driver=webdriver.Chrome()
    driver.get('http://59.83.223.61:18090') 
    driver.maximize_window()
    userAccount = "0" + str(i)
    print(userAccount)
    driver.find_element_by_id('inputUserName').send_keys(userAccount)
    driver.find_element_by_id('inputPassword').send_keys('11')
    driver.find_element_by_id('btnLogin').click()

    WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@data-name="信用项目审批"]')))
    driver.find_element_by_xpath('//*[@data-name="信用项目审批"]').click()
    WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@data-name="' + projectName + '"]')))
    driver.find_element_by_xpath('//*[@data-name="' + projectName + '"]').click()
    WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'//textarea[@id="taskResult"]')))
    driver.find_element_by_xpath('//textarea[@id="taskResult"]').send_keys("通过")
    WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'//button[@class="btn btn_minwidth btn-primary js-submit"]')))
    driver.find_element_by_xpath('//button[@class="btn btn_minwidth btn-primary js-submit"]').click()
    print(i)
    driver.quit()
