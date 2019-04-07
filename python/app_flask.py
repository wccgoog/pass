from flask import Flask,request
import json
import requests
#flask 0.12.2

app = Flask(__name__)

@app.route('/')
def index():
    return 'index'

@app.route('/rest/req',methods=['POST','GET'])
def req():
    if request.method == 'POST':
        print('post')
        if request.form:
            print('formdata')
            try:
                print(request.form.to_dict())
                #发送数据到短信接口
                send_msg(request.form.to_dict())
            except Exception as e:
                return '参数错误'
            return json.dumps(request.form.to_dict())
        elif request.get_data():
            print('json')
            try:
                print(request.get_data().decode(encoding='UTF-8',errors='strict'))
                send_msg(request.get_data())
            except Exception as e:
                return '参数错误' 
            return request.get_data()
    print('typeError')
    return request.method

def send_msg(msg):
    print('msg_start')
    # msg={
    #     "addSerial": "",
    #     "apId": "mnbgfd",
    #     "content": "231",
    #     "ecName": "政企分公司测试",
    #     "mobiles": "13382099812",
    #     "secretKey": "passwd@9845",
    #     "sign": "DWItALe3A"
    # }
    # msg为短信接口接收的数据格式
    headers = {'Content-Type': 'application/json'}
    if type(msg) == dict:
        requests.post('http://59.83.223.62:18099/dispatch/rest/message/checkUserInfoByCode', headers=headers,data=json.dumps(msg))
    elif type(msg) == bytes:
        requests.post('http://59.83.223.62:18099/dispatch/rest/message/checkUserInfoByCode', headers=headers,data=msg)
    print('msg_end')

if __name__ == '__main__':
    app.run(host='0.0.0.0')