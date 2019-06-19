import store from './store';
import information from '/templates/information/';
import credentials from '/templates/credentials/';
import serviceCard from '/templates/service-card/';
import myservice from '/templates/my-service/';
import { getAreaList, navigateToRightUrl, getUid } from '../../utils/index';
import { webView } from '../../utils/webView';

// 获取应用实例
const app = getApp();

Page(store.register({
  data: {
    avatar: app.globalData.avatar,
    nickName: app.globalData.nickName,
    isLogin: app.globalData.isLogin,
    items: [
      {
        dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/newOffice.html?workType=S",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1552397437091.png",
        name: "在办件"
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/newOffice.html?workType=O",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1552397481205.png",
        name: "办结件"
      },
    ]
  },
  onReady() { },
  onShow() {
    this.dispatch('onLoginSetUserInfo');
    this.setData({
      nickName: app.globalData.nickName,
      avatar: app.globalData.avatar,
      isLogin: app.globalData.isLogin
    })
  },
  onLoad() {
    this.dispatch('loadPageData');
  },
  wcc() {
    my.navigateTo({
      // url: '/pages/web-view/index?requestUrl=' + "https://jbxqalipay.nanjingdata.cn/m/",
      url: '/pages/faceVerify/faceVerify',
    });
  },
  ...information,
  ...credentials,
  ...serviceCard,
  ...myservice,
  toFaceVerify() {
    my.navigateTo({
      url: '/pages/faceVerify/faceVerify'
    })
  },
  toWebView(e) {
    webView(e);
  },
  logout(){
    app.globalData.isLogin=false;
    app.globalData.avatar=app.globalData.constAvatar;
    app.globalData.nickName=app.globalData.constNickName;
    this.dispatch('onLogout')
  }
}));

