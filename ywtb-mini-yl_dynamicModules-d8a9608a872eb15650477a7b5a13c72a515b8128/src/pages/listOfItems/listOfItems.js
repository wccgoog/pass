const app = getApp();

Page({
  data: {},
  onLoad(options) {
    my.alert({content:app.qrCode});
    console.log(app.qrCode);
    let urlAttr = this.getRequest();
    console.log(urlAttr)
    this.setData({urlAttr:urlAttr})
    console.log("this.data.urlAttr.window_id:"+this.data.urlAttr.window_id)
  },
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
  } 
});
