import getCityTabs from './services/city-service';
import getPageInstanceBlocks from './services/page-service';
import {getUid} from './utils/index';

App({
  qrCode: '',
  uid: '',
  faceVerifyUrl: '',
  async onLaunch(options) {
    const { query = {} } = options;
    if (query.cityId) {
      this.shareData.cityId = query.cityId;
    }
    if (query.pagetype) {
      this.shareData.pagetype = query.pagetype;
    }
    console.log('app onLaunch: options: ', options);
    // if(options.path !== 'pages/index/index'){
    //   my.reLaunch({
    //     url: '/pages/index/index', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
    //   });
    // }

    // 获取城市列表
    await getCityTabs();
  },
  onShow(options) {
    if (options && options.query) {
      this.qrCode = options.query.qrCode;
    }
    console.log('app onShow option-------------' + JSON.stringify(options));
    this.uid = getUid();
  },
  onHide() {
    console.log('app onHide');
  },
  onError(msg) {
    console.log('app OnError: ', msg);
  },
});
