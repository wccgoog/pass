import store from './store';
// 获取应用实例
const app = getApp();

Page(store.register({
  onReady() {},
  onShow() {},
  onLoad() {
    this.dispatch('loadPageData');
  },
}));

