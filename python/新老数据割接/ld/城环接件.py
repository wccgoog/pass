import time,pymysql,cx_Oracle,urllib,httplib2,json
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver=webdriver.Chrome('E:/Google/Chrome/Application/chromedriver.exe')
driver.get('http://59.83.223.61:18081') 
driver.maximize_window()
driver.find_element_by_id('inputUserName').send_keys('fanxiaoyun')
driver.find_element_by_id('inputPassword').send_keys('123')
driver.find_element_by_id('btnLogin').click()

WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.ID,'portalDropdown')))
start=driver.find_element_by_id('portalDropdown')
start.click()
action=ActionChains(driver)
action.move_to_element_with_offset(start,0,140).click().perform()
WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'//*[@data-name="窗口办理"]')))
driver.find_element_by_xpath('//*[@data-name="窗口办理"]').click()
#Oracle查询所有事项
jdbc=cx_Oracle.connect('XZSPJBXQ/XZJSXZSP@10.196.109.221:1521/ORCL',encoding = "UTF-8",nencoding = "UTF-8")
oracle=jdbc.cursor()
#oracle链接
oracle.execute("SELECT	XZSPJBXQ.XJL_XZSP_APPLICATION. ID,	XZSPJBXQ.XJL_XZSP_APPLICATION.OFFICE_NUMBER,	XZSPJBXQ.XJL_XZSP_APPLICATION.CASEFLOW_ID,	XZSPJBXQ.XJL_XZSP_APPLICATION.TRANS_ID,	XZSPJBXQ.XJL_XZSP_APPLICATION.TRANS_CODE,	XZSPJBXQ.XJL_XZSP_APPLICATION.TRANS_NAME,	XZSPJBXQ.XJL_XZSP_APPLICATION.TRANSACTION_TYPE,	XZSPJBXQ.XJL_XZSP_APPLICATION.APPLICANT_NAME,	XZSPJBXQ.XJL_XZSP_APPLICATION.APPLICANT_DOCUMENT_TYPE,	XZSPJBXQ.XJL_XZSP_APPLICATION.APPLICANT_DOCUMENT_NUMBER,	XZSPJBXQ.XJL_XZSP_APPLICATION.AGENT_NAME,	XZSPJBXQ.XJL_XZSP_APPLICATION.AGENT_DOCUMENT_TYPE,	XZSPJBXQ.XJL_XZSP_APPLICATION.AGENT_DOCUMENT_NUMBER,	XZSPJBXQ.XJL_XZSP_APPLICATION.POSTCODE,	XZSPJBXQ.XJL_XZSP_APPLICATION.ADDRESS,	XZSPJBXQ.XJL_XZSP_APPLICATION.LEGAL_REPRESENTATIVE,	XZSPJBXQ.XJL_XZSP_APPLICATION.APPLY_SOURCE,	XZSPJBXQ.XJL_XZSP_APPLICATION.APPLY_TIME,	XZSPJBXQ.XJL_XZSP_APPLICATION.PROJECT_NUMBER,	XZSPJBXQ.XJL_XZSP_APPLICATION.CREATE_BY,	XZSPJBXQ.XJL_XZSP_APPLICATION.CREATE_DATE,	XZSPJBXQ.XJL_XZSP_APPLICATION.UPDATE_BY,	XZSPJBXQ.XJL_XZSP_APPLICATION.UPDATE_DATE,	XZSPJBXQ.XJL_XZSP_APPLICATION.REMARKS,	XZSPJBXQ.XJL_XZSP_APPLICATION.DEL_FLAG,	XZSPJBXQ.XJL_XZSP_APPLICATION.STATUS,	XZSPJBXQ.XJL_XZSP_APPLICATION.CALL_FLAG,	XZSPJBXQ.XJL_XZSP_APPLICATION.CHECK_STATUS,	XZSPJBXQ.XJL_XZSP_APPLICATION.PROMISE_DATE,	XZSPJBXQ.XJL_XZSP_APPLICATION.DOCUMENT_TYPE,	XZSPJBXQ.XJL_XZSP_APPLICATION.EXPRESS_ID,	XZSPJBXQ.XJL_XZSP_APPLICATION.PICKUP_TYPE,	XZSPJBXQ.XJL_XZSP_APPLICATION.TEL_PHONE,	XZSPJBXQ.XJL_XZSP_APPLICATION.BEFORE_STATUS,	XZSPJBXQ.XJL_XZSP_APPLICATION.PHONE,	XZSPJBXQ.XJL_XZSP_APPLICATION.CONCRETE_TRANS,	XZSPJBXQ.XJL_XZSP_APPLICATION.CHECK_MESSAGE,	XZSPJBXQ.XJL_XZSP_APPLICATION.MESSAGE,	XZSPJBXQ.XJL_XZSP_APPLICATION.CONCLUDEDDATE,	XZSPJBXQ.XJL_XZSP_APPLICATION.APPLICANTPRSON_TYPE,	XZSPJBXQ.XJL_XZSP_APPLICATION.GONGCHENGMIANJI,	XZSPJBXQ.XJL_XZSP_APPLICATION.GONGCHENGZAOJIA,	XZSPJBXQ.XJL_XZSP_APPLICATION.CASEFLOW_ID_FA,	XZSPJBXQ.XJL_XZSP_APPLICATION.FLOW_STATUS,	XZSPJBXQ.XJL_XZSP_APPLICATION.BAPP_ID,	XZSPJBXQ.XJL_XZSP_APPLICATION.SYNC_STATUS,	XZSPJBXQ.XJL_XZSP_APPLICATION.THEME_ID,	UCENTER.SYS_OFFICE. NAME FROM	XZSPJBXQ.XJL_XZSP_APPLICATION,	XZSPJBXQ.XJL_XZSP_TRANS,	UCENTER.SYS_OFFICE WHERE	XZSPJBXQ.XJL_XZSP_APPLICATION.TRANS_ID = XZSPJBXQ.XJL_XZSP_TRANS. ID AND XZSPJBXQ.XJL_XZSP_TRANS.OFFICE_ID = UCENTER.SYS_OFFICE. ID AND UCENTER.SYS_OFFICE. ID = '07a3e5c2c3ca49baa6ae46c2e97c7199'")
a=oracle.fetchall()
#连接mysql
conn=pymysql.connect(host='127.0.0.1',user='root',password='ztesoft',database='jbzw',port=11111)
mysql=conn.cursor()
items = []
items1 = []
#判断元素是否存在
def is_exist_element(elem):
    flag=True
    try:
        driver.find_element_by_xpath(elem)
        return flag
    except:
        flag=False
    return flag
for i in a:
    #查询事项是否录入
    mysql.execute("SELECT * FROM jbzw.sg_item WHERE jbzw.sg_item.`NAME` = '建设项目环境影响评价文件审批（不含入海排污口设置审批，不含辐射建设项目）'and jbzw.sg_item.STATE = 'A02'")
    item=mysql.fetchall()
    if item.__len__() !=0:
        #查询事项是否录入
        mysql.execute("SELECT * FROM sg_sp_work WHERE sg_sp_work.COMMENTS = '"+str(i[1])+"'")
        banjian=mysql.fetchall()
        if banjian.__len__() ==0:
            driver.find_element_by_xpath("(//*[@id='PORTAL_DIV_MENU_50']/div/div[2]/div/div/div[1]/form/div[1]/div/div/div/input)").clear()
            #通过http请求获取单个事项详情
            http = httplib2.Http()
            print("oracle事项id="+str(i[0]))
            url = 'http://221.226.86.27:8090/xzsp-interface/a/rpc/trans/trans/showList?transBaseCode='+str(i[4])     
            body = {}  
            headers = {'Content-type': 'application/x-www-form-urlencoded'}  
            response, content = http.request(url, 'POST', headers=headers, body=urllib.parse.urlencode(body))
            json2python = json.loads(content)
            #print(json2python)
            #事项
            if json2python[0]["transName"] =="建设项目环境影响评价文件审批（不含入海排污口设置审批，不含辐射建设项目":
                driver.find_element_by_xpath("(//*[@id='PORTAL_DIV_MENU_50']/div/div[2]/div/div/div[1]/form/div[1]/div/div/div/input)").send_keys("建设项目环境影响评价文件审批（不含入海排污口设置审批，不含辐射建设项目）")
            else:
                driver.find_element_by_xpath("(//*[@id='PORTAL_DIV_MENU_50']/div/div[2]/div/div/div[1]/form/div[1]/div/div/div/input)").send_keys(json2python[0]["transName"])
            driver.find_element_by_xpath("(//*[@id='PORTAL_DIV_MENU_50']/div/div[2]/div/div/div[1]/form/div[3]/input[1])").click()
            time.sleep(1)
            flag=is_exist_element("//*[@id='divContent']/div[2]/div/div[2]/div/div/div[2]/div[2]/div[1]/div[2]/div[1]/div/table/tbody/tr[3]/td[2]/div/div")
            if flag:
                try:
                    driver.find_element_by_xpath("(//*[@id='btable_ui-id-26']/tbody/tr[3]/td[2]/div/div)").click()
                    driver.find_element_by_xpath("(//*[@id='btable_ui-id-26']/tbody/tr[4]/td[6]/div)").click()
                except:   
                    
                    driver.find_element_by_xpath("(//*[@id='btable_ui-id-26']/tbody/tr[3]/td[6]/div/button)").click()
            else:
                driver.find_element_by_xpath("(//*[@id='btable_ui-id-26']/tbody/tr[3]/td[6]/div)").click()
            if str(i[8]) =="2":
                WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,"(//*[@id='applicantA']/div[2]/div/div/div/span/span)")))
                start=driver.find_element_by_xpath("(//*[@id='applicantA']/div[2]/div/div/div/span/span)")
                start.click()
                action=ActionChains(driver)
                action.move_to_element_with_offset(start,0,80).click().perform()
                #证件号码
                time.sleep(1)
                driver.find_element_by_xpath("(//*[@id='applicantA']/div[4]/div/div[1]/input)").send_keys(str(i[9]))
                #移动电话
                if str(i[34]) =="None" or str(i[34]) =="无":
                    driver.find_element_by_xpath("(//*[@id='applicantA']/div[6]/div/div/input)").send_keys("13149279721")
                else:
                    if str(i[34]).__len__()>11 or str(i[34]).__len__()<11:
                        driver.find_element_by_xpath("(//*[@id='applicantA']/div[6]/div/div/input)").send_keys("13149279721")
                    else:
                        driver.find_element_by_xpath("(//*[@id='applicantA']/div[6]/div/div/input)").send_keys(str(i[34]))
                #单位名称
                driver.find_element_by_xpath("(//*[@id='applicantA']/div[5]/div/div/input)").send_keys(str(i[7]))
                if str(i[35]) !=None:
                    #项目名称
                    driver.find_element_by_xpath("(//*[@id='applicantA']/div[12]/div/div/input)").clear()
                    driver.find_element_by_xpath("(//*[@id='applicantA']/div[12]/div/div/input)").send_keys(str(i[35]))
                else:
                    pass
                #id str(i[1])
                driver.find_element_by_xpath("(//*[@id='applicantA']/div[15]/div/div/textarea)").send_keys(str(i[1]))
                #上传材料
                oracle.execute("SELECT XZSPJBXQ.XJL_XZSP_APPLICATION.OFFICE_NUMBER,XZSPJBXQ.XJL_XZSP_MATERIAL.MATERIAL_NAME,XZSPJBXQ.XJL_XZSP_MATERIAL.FILE_ADDRESS, XZSPJBXQ.XJL_XZSP_MATERIAL.EMPTY_FILE_ADDRESS FROM XZSPJBXQ.XJL_XZSP_APPLICATION, XZSPJBXQ.XJL_XZSP_APPLY_MATERIAL, XZSPJBXQ.XJL_XZSP_MATERIAL WHERE XZSPJBXQ.XJL_XZSP_APPLICATION.OFFICE_NUMBER = XZSPJBXQ.XJL_XZSP_APPLY_MATERIAL.OFFICE_NUMBER AND XZSPJBXQ.XJL_XZSP_APPLY_MATERIAL.MATERIAL_ID = XZSPJBXQ.XJL_XZSP_MATERIAL. ID AND XZSPJBXQ.XJL_XZSP_APPLICATION.OFFICE_NUMBER = '"+str(i[1])+"'")
                files=oracle.fetchall()
                for j in files:
                    flag=is_exist_element("//*[@title='"+str(j[1])+"']/../td/div/div/span[@id='uploader']/input")
                    if flag:
                        if str(j[2])!="None":
                            z = str(j[2]).replace('/','\\')
                            time.sleep(1)
                            driver.find_element_by_xpath("(//*[@title='"+str(j[1])+"']/../td/div/div/span[@id='uploader'])").click()
                            driver.find_element_by_xpath("(//*[@title='"+str(j[1])+"']/../td/div/div/span[@id='uploader']/input)").send_keys(r"F:\\"+z)
                        else:
                            pass
                    else:
                        pass
                #审批意见
                try:
                    driver.find_element_by_xpath("(//*[@id='content']/div[9]/form/div[4]/div/div/textarea)").send_keys("通过")
                except:
                    jq="$('textarea[name=taskResult]').val('通过')"
                    driver.execute_script(jq)
                #确认
                jq="$('.js-ok-auto').click()"
                driver.execute_script(jq) 
                #不打印
                WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'/html/body/div[4]/div[3]/button[2]')))
                driver.find_element_by_xpath("(/html/body/div[4]/div[3]/button[2])").click()
                time.sleep(1)
                driver.find_element_by_xpath("(//*[@id='divContent']/ul/li[3]/a/button/span)").click()
            else:
                time.sleep(2)
                #申请人
                driver.find_element_by_xpath("(//*[@id='applicantA']/div[5]/div/div/input)").send_keys(str(i[7]))
                #证件号
                driver.find_element_by_xpath("(//*[@id='applicantA']/div[4]/div/div[1]/input)").send_keys(str(i[9]))
                #移动电话
                if str(i[34]) =="None" or str(i[34]) =="无":
                    driver.find_element_by_xpath("(//*[@id='applicantA']/div[6]/div/div/input)").send_keys("13149279721")
                else:
                    if str(i[34]).__len__()>11 or str(i[34]).__len__()<11:
                        driver.find_element_by_xpath("(//*[@id='applicantA']/div[6]/div/div/input)").send_keys("13149279721")
                    else:
                        driver.find_element_by_xpath("(//*[@id='applicantA']/div[6]/div/div/input)").send_keys(str(i[34]))
                #id str(i[1])
                driver.find_element_by_xpath("(//*[@id='applicantA']/div[15]/div/div/textarea)").send_keys(str(i[1]))
                #审批意见
                try:
                    driver.find_element_by_xpath("(//*[@id='content']/div[9]/form/div[4]/div/div/textarea)").send_keys("通过")
                except:
                    jq="$('textarea[name=taskResult]').val('通过')"
                    driver.execute_script(jq)
                #确认
                jq="$('.js-ok-auto').click()"
                driver.execute_script(jq) 
                #不打印
                WebDriverWait(driver,15).until(EC.presence_of_all_elements_located((By.XPATH,'/html/body/div[4]/div[3]/button[2]')))
                driver.find_element_by_xpath("(/html/body/div[4]/div[3]/button[2])").click()
                
                driver.find_element_by_xpath("(//*[@id='divContent']/ul/li[3]/a/button/span)").click()
        else:
            pass
    else:
        print("未录入新系统办件编号"+str(i[1]))
        print("未录入新系统事项"+str(i[5]))
        # 保存入文本
        items.append(str(i[1]))
        items1.append(str(i[5]))
        pass
 #print(items)
f = open('F:\\Pythontest1\\chenhuan.txt', "a", encoding='UTF-8')
# 写入文本
f.write("未录入新系统办件编号：" + str(i[1]) + '\n')
f.write("未录入新系统事项：" + str(i[5]) + '\n')
f.write("未录入新系统办件：" + str(items) + '\n')
f.write("未录入新系统事项：" + str(items1) + '\n')
f.write('\n\n')

f.close()

# 判断文本是否已创建，添加路径
def judgePath(self):
    if os.path.exists('F:\\Pythontest1') == False:
        os.mkdir('F:\\Pythontest1')
    if os.path.exists("F:\\Pythontest1\\chenhuan.txt") == True:
        os.remove("F:\\Pythontest1\\chenhuan.txt")
driver.quit()
conn.close()
jdbc.close()