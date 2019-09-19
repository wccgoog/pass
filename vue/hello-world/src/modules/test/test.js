import Vue from 'vue';
import Test from './Test.vue';
import BaiduMap from 'vue-baidu-map';

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'HQZVXDiOe5I0fVjfIcaaZsNkvMt4u8pH'
});

new Vue({
    render: h => h(Test),
}).$mount('#app');