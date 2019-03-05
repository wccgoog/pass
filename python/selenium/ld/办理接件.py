import time,pymysql,cx_Oracle,urllib,httplib2,json
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

#打开浏览器
driver=webdriver.Chrome('E:/Google/Chrome/Application/chromedriver.exe')
driver.get('http://59.83.223.61:18081')     
driver.maximize_window()
driver.find_element_by_id('inputUserName').send_keys('yinhang')
driver.find_element_by_id('inputPassword').send_keys('123')
driver.find_element_by_id('btnLogin').click()

WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'portalDropdown')))
start=driver.find_element_by_id('portalDropdown')
start.click()
action=ActionChains(driver)
action.move_to_element_with_offset(start,0,90).click().perform()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@data-name="我的待办"]')))
driver.find_element_by_xpath('//*[@data-name="我的待办"]').click()
#办理
time.sleep(1)
driver.find_element_by_xpath("(//*[@id='PORTAL_DIV_MENU_110']/div/div[2]/div/div/div[1]/div/div[3])").click()


count = 0
while count < 240:
    time.sleep(1)
    driver.find_element_by_xpath("(//*[@id='PORTAL_DIV_MENU_110']/div/div[2]/div/div/div[1]/div/div[3])").click()
    count += 1
    print("循环次数",count)
    #断点切换到办理页面
    #点击办理
    time.sleep(1)
    driver.find_element_by_xpath("(//*[@id='divContent']/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div[2]/div[1]/div/table/tbody/tr[2]/td[15]/div/button[1])").click()
    #审批通过
    #获取打开的多个窗口句柄
    windows = driver.window_handles
    #切换到当前最新打开的窗口
    driver.switch_to.window(windows[-1])
    time.sleep(1)
    try:
        driver.find_element_by_xpath("(/html/body/div[4]/div[3]/div/button[1])").click()
    except:
        driver.find_element_by_xpath("(/html/body/div[4]/div[3]/div/button[1])").click()
    time.sleep(1)
    driver.find_element_by_xpath("(//*[@id='taskResult'])").send_keys("通过")
    #确认
    driver.find_element_by_xpath("(/html/body/div[5]/div[2]/div/form[2]/div[3]/button[2])").click()
    time.sleep(1)
    try:
        driver.find_element_by_xpath("(/html/body/div[3]/div[3]/button)").click()
    except:
        try:
            driver.find_element_by_xpath("(/html/body/div[4]/div[3]/button[2])").click()
        except:
            driver.find_element_by_xpath("(/html/body/div[3]/div[3]/button)").click()
    

