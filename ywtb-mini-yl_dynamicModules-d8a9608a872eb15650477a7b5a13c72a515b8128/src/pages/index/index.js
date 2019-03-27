import store from './store';
import information from '/templates/information/';
import credentials from '/templates/credentials/';
import serviceCard from '/templates/service-card/';
import myservice from '/templates/my-service/';

// 获取应用实例
const app = getApp();

Page(store.register({
  data:{
    background:[
      "https://jbxqalipay.nanjingdata.cn/image/tb1.jpg",
      // "https://jbxqalipay.nanjingdata.cn/image/tb2.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb3.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb4.jpg",
      // "https://jbxqalipay.nanjingdata.cn/image/tb5.jpg",
      // "https://jbxqalipay.nanjingdata.cn/image/tb6.jpg"
    ]
  },
  onShow() {
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
    // this.dispatch('getPageBlocks');
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

