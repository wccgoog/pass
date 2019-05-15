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
  goIndex(){
    // my.navigateTo({
    //   url: '/pages/index/index'
    // });
    my.switchTab({
      url: '../../pages/index/index'
    })
  }
});
