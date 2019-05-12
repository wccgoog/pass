import { faceVerify } from '../../utils/faceVerify';

const app = getApp();

Page({
  data: {
    url: ''
  },
  onLoad(options) {
    console.log(options);
    if (options.url) {
      this.setData({
        url: options.url
      });
    }
    if (options.type == "attorneys") {
      faceVerify('https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/daiban.html','https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/index.html');
    } else if (options.type == "myself") {
      faceVerify('https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/selfApp.html','https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/index.html');
    }
  },
  onShow() {
  },
  // faceVerify(){
  //   my.ap.faceVerify({
  //     bizId: '545689787654767653', //业务请求的唯一标识，需要保证唯一性
  //     bizType: '2', //业务场景参数，必须填写‘2’，代表刷脸认证  
  //     success: (res) => {
  //       if(res.faceRetCode == "1000"){
  //         // my.alert({
  //         //   content: "刷脸成功" + JSON.stringify(res) + "即将跳转至h5页面https://jbxqalipay.nanjingdata.cn/m/test.html",
  //         // });
  //         my.navigateTo({
  //           //跳转低保办理页面
  //           url: '/pages/web-view/index?requestUrl=' +  'https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/selfApp.html?uid=' + app.uid,
  //           // options有url作为参数时可用下面的url
  //           // url: '/pages/web-view/index?requestUrl=' +  this.data.url + app.uid,   
  //         });
  //       }
  //       else{
  //         my.alert({
  //             content: "请开启摄像头权限",
  //         });
  //       }
  //     },
  //     fail: (res) => {
  //         my.alert({
  //             content: JSON.stringify(res),
  //         });
  //     }
  //   });
  // }
});
