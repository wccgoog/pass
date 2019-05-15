const app = getApp();

export function faceVerify(url, failUrl) {
  my.ap.faceVerify({
    bizId: '545689787654767653', //业务请求的唯一标识，需要保证唯一性
    bizType: '2', //业务场景参数，必须填写‘2’，代表刷脸认证  
    success: (res) => {
      if (res.faceRetCode == "1000") {
        // my.alert({
        //   content: "刷脸成功" + JSON.stringify(res) + "即将跳转至h5页面https://jbxqalipay.nanjingdata.cn/m/test.html",
        // });
        my.navigateTo({
          //跳转低保办理页面
          url: '/pages/web-view/index?requestUrl=' + url + '?uid=' + app.uid,
          // options有url作为参数时可用下面的url
          // url: '/pages/web-view/index?requestUrl=' +  this.data.url + app.uid,   
        });
      }
      else {
        my.navigateTo({
          url: '/pages/web-view/index?requestUrl=' + failUrl + '?uid=' + app.uid,
        });
      }
    },
    fail: (res) => {
      my.alert({
        content: JSON.stringify(res),
      });
    }
  });
}