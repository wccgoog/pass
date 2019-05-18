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
<<<<<<< HEAD
  onHide() {
    this.setData({
      showText: '请稍等......'
    });
=======
  goIndex(){
    // my.navigateTo({
    //   url: '/pages/index/index'
    // });
    my.switchTab({
      url: '../../pages/index/index'
    })
>>>>>>> 47d38facb77484e166a30c78d82653546ee6ea73
  }
});
