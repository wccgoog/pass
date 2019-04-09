const app = getApp();

Page({
  data: {},
  onLoad(options) {
    my.alert({content:app.qrCode});
    console.log(app.qrCode);
    // let urlAttr = this.getRequest();
    let urlAttr = this.getUrl();
    this.setData({urlAttr:urlAttr})
  },
  //带参数的url获取参数对象
  getRequest() {  
      let url = app.qrCode; 
      let theRequest = new Object();  
      if (url.indexOf("?") != -1) {  
          let str = url.substr(url.indexOf("?") + 1);  
          let strs = str.split("&");  
          for(let i = 0; i < strs.length; i ++) {  
              theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);  
          }  
      }
    return theRequest;  
  },
  //不带参数时获取最后的目录路径
  getUrl(){
    let url = app.qrCode;
    let num = url.substr(url.lastIndexOf('/')+1);
    return num;
  } 
});
