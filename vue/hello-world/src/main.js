import Vue from 'vue';
import App from './App.vue';
import './plugins/element.js';
import axios from 'axios';
import BaiduMap from 'vue-baidu-map';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'HQZVXDiOe5I0fVjfIcaaZsNkvMt4u8pH'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');


