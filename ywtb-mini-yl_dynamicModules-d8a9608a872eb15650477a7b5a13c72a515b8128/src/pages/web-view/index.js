import store from './store';
Page(store.register({
  data: {
  },

  onLoad(option) {
    console.log(option);
    let requestUrl = option.requestUrl ? option.requestUrl : '';
    this.dispatch('loadRequestUrl', requestUrl);
  },
}));
