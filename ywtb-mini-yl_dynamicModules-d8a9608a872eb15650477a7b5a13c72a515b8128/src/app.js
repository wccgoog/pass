import getCityTabs from './services/city-service';
import getPageInstanceBlocks from './services/page-service';
import { getUid } from './utils/index';

App({
  qrCode: '',
  globalData: {
    test: '',
    latestUsed: [[0, 0], [0, 1], [0, 2], [2, 0]],
    //初始头像
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OEpRddJBTljCwxpcwDXQ.png',
    //初始姓名栏
    nickName: '请点击此处登录',
    //默认未登录,获取到用户昵称和头像后才会变为true
    isLogin: false,
    //只有在用户未授权的时候,点击登录,才会进入auth界面,在auth界面变为true,跳转回首页时,会获取用户信息,获取后消耗,变回false
    isAuth: false,
    //退出登录后姓名栏,务必与nickName同步修改
    constNickName: '请点击此处登录',
    //退出登录后头像,务必与avatar同步修改
    constAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/OEpRddJBTljCwxpcwDXQ.png',
    //是否从homePage跳转登录
    isJump: 0,
  },
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
    // this.uid = getUid();
  },
  onHide() {
    console.log('app onHide');
  },
  onError(msg) {
    console.log('app OnError: ', msg);
  },
});
