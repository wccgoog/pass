Page({
  data: {},
  onShow() {
    my.scan({
      type: 'qr',
      success: (res) => {
        my.alert({ title: res.code });
        if (res.code.indexOf("https://jbzw.qimixi.net/static/img/")>=0){
          let str = res.code;
          let p = str.lastIndexOf("/");
          let id = str.substring(p + 1, str.length);
          console.log(id);
          my.navigateTo({
            url: '/pages/web-view/index?requestUrl=' + "https://jbxqalipay.nanjingdata.cn/m/listOfItems.html?window_id=" + id,
          });
        } else if (res.code.indexOf("https://jbzw.qimixi.net/static/in/") >= 0){
          let str = res.code;
          let p = str.lastIndexOf("/");
          let id = str.substring(p + 1, str.length);
          console.log(id);
        }
      },
    });
  },
  scan(){
    console.log("scan starting");
    my.scan({
      type: 'qr',
      success: (res) => {
        my.alert({ title: res.code });
        if (res.code.indexOf("https://jbzw.qimixi.net/static/img/")>=0){
          let str = res.code;
          let p = str.lastIndexOf("/");
          let id = str.substring(p + 1, str.length);
          console.log(id);
          my.navigateTo({
            url: '/pages/web-view/index?requestUrl=' + "https://jbxqalipay.nanjingdata.cn/m/listOfItems.html?window_id=" + id,
          });
        } else if (res.code.indexOf("https://jbzw.qimixi.net/static/in/") >= 0){
          let str = res.code;
          let p = str.lastIndexOf("/");
          let id = str.substring(p + 1, str.length);
          console.log(id);
          // wx.navigateTo({
          //   url: '../navigation/navigation?in=' + id,
          // })
        }
      },
    });
    // my.navigateTo({
    //   url: '/pages/web-view/index?requestUrl=' + "https://jbxqalipay.nanjingdata.cn/m/index.html",
    // });
  }
});
