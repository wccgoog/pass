import store from './store';
import information from '/templates/information/';
import credentials from '/templates/credentials/';
import serviceCard from '/templates/service-card/';
import myservice from '/templates/my-service/';
import { getAreaList, navigateToRightUrl, getUid } from '../../utils/index';
import { faceVerify } from '../../utils/faceVerify';
import { webView, latestUsed } from '../../utils/webView';
import { authLogin } from '../../utils/login';

// 获取应用实例
const app = getApp();

Page(store.register({
  data: {
    avatar: app.globalData.avatar,
    nickName: app.globalData.nickName,
    isLogin: app.globalData.isLogin,
    dataId: 0,
    // tab切换  
    currentTab: 0,
    //二级目录所用
    firstCatalog: '',
    secondCatalog: '',
    //当前1、个人  2、企业
    currentFirstCatalog: 1,
    // 首页获取数据
    personal_topic: '',
    personal_department: '',
    //企业服务
    business_topic: '',
    business_department: '',
    items: [],
    background: [
      "https://jbxqalipay.nanjingdata.cn/image/tb1.jpg",
      // "https://jbxqalipay.nanjingdata.cn/image/tb2.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb3.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb4.jpg",
      // "https://jbxqalipay.nanjingdata.cn/image/tb5.jpg",
      // "https://jbxqalipay.nanjingdata.cn/image/tb6.jpg"
    ],
    itemList: [
      //   {
      //   title: "社会保障",
      //   bOrC: 0,
      //   items: [{
      //     dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/handicapped/index.html",
      //     src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289496383.png",
      //     name: "智慧残联",
      //     detail: "残疾人政策、助残、就业服务"
      //   },
      //   {
      //     dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/lowSecurity/templates/index.html",
      //     src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993197712.jpg",
      //     name: "低保申请",
      //     detail: "江北新区本地户籍低保在线申请"
      //   }
      //   ]
      // },

      {
        title: "城市环保",
        bOrC: 1,
        items: [
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=H",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993078676.png",
            name: "城市道路绿化",
            detail: "建设单位占道挖掘、修复补偿征收"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=K",
            src: "https://jbxqalipay.nanjingdata.cn/image/garbage.png",
            name: "餐厨垃圾",
            detail: "餐厨垃圾、城市生活垃圾审批"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=J",
            src: "https://jbxqalipay.nanjingdata.cn/image/stbc.png",
            name: "水土保持",
            detail: "建设单位水土保持方案审批与征收"
          }
        ]
      },
      {
        title: "农业发展",
        bOrC: 1,
        items: [
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/movehandleItem.html?siteId=1&id=JFJ00001&types=c&isOne=A",
            src: "https://jbxqalipay.nanjingdata.cn/image/animal.png",
            name: "兽医师注册",
            detail: "兽医师注册、助理执业兽医师备案"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=M",
            src: "https://jbxqalipay.nanjingdata.cn/image/medicine.png",
            name: "农兽药许可",
            detail: "农药、兽药经营许可证核发"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/movehandleItem.html?siteId=1&id=JFJ00002&types=c&isOne=A",
            src: "https://jbxqalipay.nanjingdata.cn/image/pipe.png",
            name: "管道事故备案",
            detail: "管道事故应急预案备案"
          },
        ]
      },
      {
        title: "文化生活",
        bOrC: 1,
        items: [{
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=D",
          src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289514896.png",
          name: "电影放映",
          detail: "电影单位设立、变更及注销审批"
        },
          // {
          //   dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=F",
          //   src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009274987.JPG",
          //   name: "文化演艺",
          //   detail: "文化演艺相关事项"
          // }
        ]
      },
    ],
    specificZone: [{
      title: '残联',
      dataId: 'https://jbxqalipay.nanjingdata.cn' + app.globalData.test + '/web/wechat/modules/handicapped/index.html',
      src: 'https://jbxqalipay.nanjingdata.cn/image/disabled.png'
    },
    {
      title: '低保',
      dataId: 'https://jbxqalipay.nanjingdata.cn' + app.globalData.test + '/web/wechat/modules/lowSecurity/templates/index.html',
      src: 'https://jbxqalipay.nanjingdata.cn/image/live.png'
    }
    ]
  },
  onShow() {
    var _this = this;
    _this.setData({
      nickName: app.globalData.nickName,
      avatar: app.globalData.avatar,
      isLogin: app.globalData.isLogin
    })
    var latestUsedItems = [];
    app.globalData.latestUsed.forEach(
      (value, index) => {
        latestUsedItems[index] = _this.data.itemList[value[0]].items[value[1]];
      }
    )
    this.setData({
      items: latestUsedItems
    });
    // my.hideAddToDesktopMenu();
    //用户自动登录
    // this.dispatch('onLoginSetUserInfo');

    // const { shareData } = app;
    // const { city } = shareData;
    // const { changed } = city;
    // if (changed) {
    // my.setNavigationBar({
    //   image:"https://jbxqalipay.nanjingdata.cn/image/tb3.jpg",
    //   title:"123",
    //   borderBottomColor:"red",
    //   success: (res) => {
    //     console.log('success');
    //   },
    // });
    // this.dispatch('updateHasReadMessage');
    // this.dispatch('getPageBlocks');

    //   city.changed = false;
    // }
  },
  /**
   * 页面加载时，初始化请求
   */
  async onLoad(options) {
    // this.dispatch('updateCityTabs');
    this.dispatch('updateLocalAuthCode');
    // this.dispatch('getPageBlocks');
    console.log("index.js---onLoad");
    if (options.url) {
      this.setData({
        url: options.url
      });
    }
    var _this = this;
    //初始加载获取个人服务下方主题和部门数据
    my.request({
      url: 'https://jbzw.qimixi.net/api/Index/index',
      method: "GET",
      data: {
        type: 1
      },
      success: function (res) {
        _this.setData({
          personal_topic: res.data.data.topic,
          personal_department: res.data.data.department
        })
      }
    })
    my.request({
      url: 'https://jbzw.qimixi.net/api/Index/index',
      method: "GET",
      data: {
        type: 2
      },
      success: function (res) {
        _this.setData({
          business_topic: res.data.data.topic,
          business_department: res.data.data.department
        })
      }
    })

    // this.dispatch('loadServiceMarketInfo', {
    //   'pageInstanceId': '201811231110002121111222',
    //   'areaCode': '310100',
    // });
  },
  onLoginSetUserInfo() {
    this.dispatch('onLoginSetUserInfo');
  },
  toWebView(e) {
    var _this = this;
    // this.dispatch('onLoginSetUserInfo');
    webView(e);
    setTimeout(() => {
      var latestUsedItems = [];
      app.globalData.latestUsed.forEach(
        (value, index) => {
          latestUsedItems[index] = _this.data.itemList[value[0]].items[value[1]];
        }
      )
      this.setData({
        items: latestUsedItems
      })
    }, 2000)
  },
  swichNav: function (e) {
    this.setData({
      dataId: e.target.dataset.id
    });
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  goListDetail(e) {
    let toUrl = escape('https://jbxqalipay.nanjingdata.cn/m/listDetail.html?type=1&sid=' + e.currentTarget.dataset.id)
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + toUrl,
    });
  },
  goDepartment() {
    let toUrl = escape('https://jbxqalipay.nanjingdata.cn/m/gerenzhongxin.html?type=1')
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + toUrl,
    });
  },
  goMore(e) {
    let toUrl = escape('https://jbxqalipay.nanjingdata.cn/m/goMore.html?type=' + e.target.dataset.first)
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + toUrl,
    });
  },
  choose(e) {
    this.setData({
      dataId: e.target.dataset.id
    })
  },
  login() {
    authLogin();
  },
  // ...information,
  // ...credentials,
  // ...serviceCard,
  // ...myservice,
}));

