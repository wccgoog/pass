import store from './store';
import information from '/templates/information/';
import credentials from '/templates/credentials/';
import serviceCard from '/templates/service-card/';
import myservice from '/templates/my-service/';
import { getAreaList, navigateToRightUrl, getUid } from '../../utils/index';
import { webView } from '../../utils/webView';
import { authLogin } from '../../utils/login';

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
        src: "https://jbxqalipay.nanjingdata.cn/image/doing.png",
        name: "在办件"
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/newOffice.html?workType=O",
        src: "https://jbxqalipay.nanjingdata.cn/image/done.png",
        name: "办结件"
      },
    ]
  },
  onReady() { },
  onShow() {
    console.log("personal-center,onShow")
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
      url: '/pages/faceVerify/faceVerify',
    });
  },
  toFaceVerify() {
    my.navigateTo({
      url: '/pages/faceVerify/faceVerify'
    })
  },
  toWebView(e) {
    if (!app.globalData.isLogin) {
      let _this = this;
      my.confirm({
        title: "请登录",
        content: "登录后即可网上申报和查询办件",
        confirmButtonText: "登录",
        success: (res) => {
          if (res.confirm) {
            my.showLoading({
              content: '加载中...',
            });
            let callback = () => {
              _this.setData({
                nickName: app.globalData.nickName,
                avatar: app.globalData.avatar,
                isLogin: app.globalData.isLogin
              })
            }
            authLogin(callback);
          }
        },
      });
    } else {
      webView(e);
    }
  },
  logout() {
    app.globalData.isLogin = false;
    app.globalData.avatar = app.globalData.constAvatar;
    app.globalData.nickName = app.globalData.constNickName;
    this.dispatch('onLogout')
  },
  login() {
    if (!app.globalData.isLogin) {
      let _this = this;
      my.confirm({
        title: "请登录",
        content: "登录后即可网上申报和查询办件",
        confirmButtonText: "登录",
        success: (res) => {
          if (res.confirm) {
            my.showLoading({
              content: '加载中...',
            });
            let callback = () => {
              _this.setData({
                nickName: app.globalData.nickName,
                avatar: app.globalData.avatar,
                isLogin: app.globalData.isLogin
              })
            }
            authLogin(callback);
          }
        },
      });
    }
  }
}));

