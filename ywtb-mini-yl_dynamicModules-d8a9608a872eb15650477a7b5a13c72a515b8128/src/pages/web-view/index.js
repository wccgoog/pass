import store from './store';
Page(store.register({
  data: {
  },

  onLoad(option) {
    console.log("web-view.js", option);
    option.requestUrl = option.requestUrl.replace(/ /g, '+');
    let requestUrl = option.requestUrl ? option.requestUrl : '';
    this.dispatch('loadRequestUrl', requestUrl);
  },
}));
