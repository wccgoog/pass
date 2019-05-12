import store from './store';
import information from '/templates/information/';
import credentials from '/templates/credentials/';
import serviceCard from '/templates/service-card/';
import myservice from '/templates/my-service/';
import { getAreaList, navigateToRightUrl, getUid } from '../../utils/index';
import { faceVerify } from '../../utils/faceVerify';

// 获取应用实例
const app = getApp();

Page(store.register({
  data: {
    background: [
      "https://jbxqalipay.nanjingdata.cn/image/tb1.jpg",
      // "https://jbxqalipay.nanjingdata.cn/image/tb2.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb3.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb4.jpg",
      // "https://jbxqalipay.nanjingdata.cn/image/tb5.jpg",
      // "https://jbxqalipay.nanjingdata.cn/image/tb6.jpg"
    ]
  },
  onShow() {
    // my.hideAddToDesktopMenu();
    //用户自动登录
    this.dispatch('onLoginSetUserInfo');

    // const { shareData } = app;
    // const { city } = shareData;
    // const { changed } = city;
    // if (changed) {
    // my.setNavigationBar({
    //   image:"https://jbxqalipay.nanjingdata.cn/image/tb3.jpg",
    //   title:"123",
    //   borderBottomColor:"red",
    //   success: (res) => {
    //     console.log('success');
    //   },
    // });
    this.dispatch('updateHasReadMessage');
    this.dispatch('getPageBlocks');

    //   city.changed = false;
    // }
  },
  /**
   * 页面加载时，初始化请求
   */
  async onLoad(options) {
    this.dispatch('updateCityTabs');
    this.dispatch('updateLocalAuthCode');
    this.dispatch('getPageBlocks');
    console.log(options);
    if (options.url) {
      this.setData({
        url: options.url
      });
    }

    //低保事项扫脸
    if (options.type == "attorneys") {
      faceVerify('https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/daiban.html', 'https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/index.html');
    } else if (options.type == "myself") {
      faceVerify('https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/selfApp.html', 'https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/index.html');
    }
    
    // this.dispatch('loadServiceMarketInfo', {
    //   'pageInstanceId': '201811231110002121111222',
    //   'areaCode': '310100',
    // });
  },
  ...information,
  ...credentials,
  ...serviceCard,
  ...myservice,
}));

