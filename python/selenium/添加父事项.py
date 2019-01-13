import time,pymysql,cx_Oracle,urllib,json
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

#连接mysql
conn=pymysql.connect(host='10.196.109.221',user='root',password='ztesoft',database='hkzw')
mysql=conn.cursor()
#Oracle查询所有事项
jdbc=cx_Oracle.connect('XZSPJBXQ/XZJSXZSP@10.196.109.221:1521/ORCL',encoding = "UTF-8",nencoding = "UTF-8")
oracle=jdbc.cursor()
#父事项
oracle.execute("SELECT * FROM XZSPJBXQ.XJL_XZSP_TRANS WHERE XZSPJBXQ.XJL_XZSP_TRANS.IS_PARENTITEM = 1 AND XZSPJBXQ.XJL_XZSP_TRANS.DEL_FLAG = 0 AND OFFICE_ID='4d3fc7f63e814d5790c4b299bc91c424'")
a=oracle.fetchall()
driver=webdriver.Chrome('E:/Google/Chrome/Application/chromedriver.exe')
driver.get('http://59.83.223.61:18081') 
#最大化
driver.maximize_window()
#等待加载cs
# driver.find_element_by_id('kw').send_keys('wcc') 
#输入用户名
driver.find_element_by_id('inputUserName').send_keys('xumin')
driver.find_element_by_id('inputPassword').send_keys('123')
driver.find_element_by_id('btnLogin').click()
#模块
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'outAndOver')))
#driver.find_element_by_id('outAndOver').click()
driver.find_element_by_xpath("(//div[@id='outAndOver'])[2]").click() 
for i in a:
    #判断事项是否新增了
        mysql.execute("SELECT * FROM sg_item WHERE NAME = '"+str(i[3])+"' AND STATE = 'A02'")
        item=mysql.fetchall()
        if item.__len__()==0:
            #新增
            WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'btnAddItem')))
            time.sleep(1)
            driver.find_element_by_xpath("(//*[@id='btnAddItem'])").click()
            #name
            #driver.find_element_by_name('name').send_keys('法律修订新增')
            time.sleep(1)
            driver.find_element_by_xpath("(//input[@name='name'])[2]").send_keys(str(i[3]))
            #driver.find_element_by_xpath("(/html/body/div[4]/div[2]/div/div[1]/form[1]/div[2]/div/div/span)").click()
            #是否子事项
            start=driver.find_element_by_xpath('/html/body/div[4]/div[2]/div/div[1]/form[1]/div[2]/div/div/span')
            start.click()
            action=ActionChains(driver)
            action.move_to_element_with_offset(start,0,20).click().perform()
            #行使层级（省718904088）
            jq="$('input[name=exeTierId]').val('718904088')"
            driver.execute_script(jq)
            driver.find_element_by_xpath("(/html/body/div[4]/div[2]/div/div[1]/form[1]/div[3]/div[1]/div/input)").send_keys('直属/省级')
            #部门关联
            # jq="$('input[name=orgId]').val('"+str(officeID[0][0])+"')"
            # driver.execute_script(jq) 
            #主体性质 89 法定机关
            jq="$('input[name=transactionOrgTypeId]').val('89')"
            driver.execute_script(jq)
            #权力来源 110006
            jq="$('input[name=privUpdateTypeId]').val('110006')"
            driver.execute_script(jq)
            #设定依据
            workContent='无'
            driver.find_element_by_name('setGist').send_keys(workContent)
            # 权限划分和行使内容
            driver.find_element_by_name('approveRange').send_keys('权限划分和行使内容')
            #提交
            driver.find_element_by_xpath("(/html/body/div[4]/div[3]/div/button[2])").click()
            #确认提交
            driver.find_element_by_xpath("(/html/body/div[5]/div[3]/button[1])").click()
            time.sleep(2)
            driver.find_element_by_xpath("(/html/body/div[3]/div[3]/button)").click()
        else:
            pass
#关闭并退出浏览器
driver.quit()
mysql.close()
conn.close()