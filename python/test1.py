import requests
import json
msg={
    "addSerial": "",
    "apId": "mnbgfd",
    "content": "哈3213123哈",
    "ecName": "政企分公司测试",
    "mobiles": "13382099812",
    "secretKey": "passwd@9845",
    "sign": "DWItALe3A"
}
headers = {'Content-Type': 'application/json'}
r = requests.post('http://59.83.223.62:18099/dispatch/rest/message/checkUserInfoByCode', headers=headers,data=json.dumps(msg))
print('end')
print(r.json())