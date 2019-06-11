import store from './store';
Page(store.register({
  data: {
  },

  onLoad(option) {
    console.log("web-view.js",option);
    let requestUrl = option.requestUrl ? option.requestUrl : '';
    this.dispatch('loadRequestUrl', requestUrl);
  },
}));
