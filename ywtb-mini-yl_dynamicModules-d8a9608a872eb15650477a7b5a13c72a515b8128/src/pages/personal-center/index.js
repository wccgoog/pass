import store from './store';
import information from '/templates/information/';
import credentials from '/templates/credentials/';
import serviceCard from '/templates/service-card/';
import myservice from '/templates/my-service/';
import { getAreaList, navigateToRightUrl, getUid } from '../../utils/index';

// 获取应用实例
const app = getApp();

Page(store.register({
  data: {
    items: [
      {
        dataId: "https://jbxqalipay.nanjingdata.cn"+app.test+"/web/wechat/modules/workGuide/templates/newOffice.html?workType=S",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1552397437091.png",
        name: "在办件"
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn"+app.test+"/web/wechat/modules/workGuide/templates/newOffice.html?workType=O",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1552397481205.png",
        name: "办结件"
      },
    ]
  },
  onReady() { },
  onShow() { },
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
    this.dispatch('onLoginSetUserInfo');
    let uid = getUid();
    let toUrl = '';
    let url = e.currentTarget.dataset.id;
    if (url.indexOf("?") == -1) {
      toUrl = escape(url + '?code=A&uid=' + uid)
    } else {
      toUrl = escape(url + '&code=A&uid=' + uid)
    }
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + toUrl,
    });
  }
}));

