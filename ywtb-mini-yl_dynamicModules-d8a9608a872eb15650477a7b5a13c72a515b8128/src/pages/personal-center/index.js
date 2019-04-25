import store from './store';
import information from '/templates/information/';
import credentials from '/templates/credentials/';
import serviceCard from '/templates/service-card/';
import myservice from '/templates/my-service/';

// 获取应用实例
const app = getApp();

Page(store.register({
  onReady() {},
  onShow() {},
  onLoad() {
    this.dispatch('loadPageData');
  },
  wcc(){
    console.log("wcc");
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + "https://jbxqalipay.nanjingdata.cn/m/",
    });
  },
  ...information,
  ...credentials,
  ...serviceCard,
  ...myservice,
}));

