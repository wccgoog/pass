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
  ...information,
  ...credentials,
  ...serviceCard,
  ...myservice,
}));

