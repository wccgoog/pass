// pages/homePage/homePage.js
//获取应用实例  
var app = getApp()
Page({
  data: {
    dataId: 0,
    x: 10,
    y: 140,
    delta: 1,
    //页面配置 
    winWidth: 0,
    winHeight: 0,
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
    // banner图
    background: [],
    // banner图相关配置
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    picAnimation: {},
    intervalNum: 0,
    itemList: [{
        title: "社会保障",
        bOrC: 0,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/handicapped/index.html",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289496383.png",
            name: "智慧残联",
            detail: "智慧残联相关事项"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/index.html",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993197712.jpg",
            name: "低保申请",
            detail: "低保申请相关事项"
          }
        ]
      },
      {
        title: "文化生活",
        bOrC: 1,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=D",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289514896.png",
            name: "电影放映",
            detail: "电影放映相关事项"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=F",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009274987.JPG",
            name: "文化演艺",
            detail: "文化演艺相关事项"
          }
        ]
      },
      {
        title: "城市环保",
        bOrC: 1,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=H",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993078676.png",
            name: "城市道路绿化",
            detail: "城市道路绿化相关事项"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=K",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559287396293.png",
            name: "餐厨垃圾",
            detail: "餐厨垃圾相关事项"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=J",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559287660191.png",
            name: "水土保持",
            detail: "水土保持相关事项"
          }
        ]
      },
      {
        title: "农林机械",
        bOrC: 1,
        items: [{
          dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=G",
          src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009651180.png",
          name: "农业林业",
          detail: "农业林业相关事项"
        }]
      }
    ],
  },
  // loading显示方法
  loading: function() {
    wx.showLoading({
      title: 'XXX',
    })
  },
  onLoad: function() {

    wx.login({
      success(res) {
        app.globalData.code = res.code;
        wx.getUserInfo({
          success(resuserinfo) {
            //登录第三方系统返回用户已留存的信息
            wx.request({
              url: 'https://jbzw.qimixi.net/api/wechat',
              data: {
                code: res.code,
                encryptedData: resuserinfo.encryptedData,
                rawData: resuserinfo.rawData,
                iv: resuserinfo.iv,
                signature: resuserinfo.signature,
              },
              success: function(result) {
                // console.log(result);
                //记录session3rd到app.globalData
                app.globalData.session3rd = result.data.data.session3rd;
                app.globalData.realname = result.data.data.user_info.realname;
                app.globalData.mobile = result.data.data.user_info.mobile;
                app.globalData.credential_id = result.data.data.user_info.credential_id;
                wx.setStorage({
                  key: 'session3rd',
                  data: result.data.data.session3rd,
                })
              },
              fail(e) {
                console.log('request failed');
              }
            })
          },
          fail(e) {
            console.log('getUserInfo failed----------', e);
            wx.getStorage({
              key: 'session3rd',
              success: function(res) {
                console.log(res);
                app.globalData.session3rd = res.data;
              },
            })
          }
        })
      },
      fail(e) {
        console.log('login failed', e)
      }
    });




    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
        console.log(that.data.winHeight);
      }
    });
    var _this = this;
    //初始加载获取个人服务下方主题和部门数据
    wx.request({
      url: 'https://jbzw.qimixi.net/api/Index/index?type=1',
      data: "",
      method: 'GET',
      success: function(res) {
        _this.setData({
          personal_topic: res.data.data.topic,
          personal_department: res.data.data.department
        })
      },
      fail: function(res) {
        console.log("fail");
        console.log(res);
      },
      complete: function(res) {
        console.log('submit complete');
        wx.hideLoading()
      }
    })
    //请求首页banner图
    wx.request({
      url: 'https://jbzw.qimixi.net/api/banner/bannerList',
      data: "",
      method: 'POST',
      success: function(res) {
        let list = res.data.data.list;
        let listArr = [];
        for (var i in list) {
          listArr.push(list[i].image)
        }
        _this.setData({
          background: listArr
        })
      }
    })
  },
  onShow() {
    var _this = this;
    //本来想用animation做办事一张图的圆形图标的飘动效果,但是有一些问题
    // let animation = wx.createAnimation({
    //   duration:20000,
    //   timingFunction:'linear'
    // });
    // animation.translate(100,100).step();
    // this.setData({
    //   picAnimation:animation.export()
    // });
    // console.log(this.data.picAnimation)

    //首页小圆圈漂浮,setData性能消耗过多
    console.log(wx.getSystemInfoSync().windowWidth)
    var n = setInterval(() => {
      if (_this.data.x == wx.getSystemInfoSync().windowWidth - 52) {
        _this.setData({
          delta: -_this.data.delta
        })
      } else if (_this.data.x == 0) {
        _this.setData({
          delta: -_this.data.delta
        })
      }
      _this.setData({
        x: _this.data.x + _this.data.delta,
        y: _this.data.y + _this.data.delta,
      })
    }, 100);
    this.setData({
      intervalNum: n
    })
  },
  onHide() {
    console.log('hide', this.data.x)
    clearInterval(this.data.intervalNum);
  },
  //滑动切换tab
  bindChange: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    console.log(e.detail.current)
    that.setData({
      currentTab: e.detail.current,
      dataId: e.detail.current
    });
    if (e.detail.current == 1) {
      this.company(2);
    } else {
      this.company(1);
    }
  },
  //点击tab切换
  swichNav: function(e) {
    this.setData({
      dataId: e.target.dataset.id
    });
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    // if (e.detail.current == 1) {
    //   this.company(2);
    // } else {
    //   this.company(1);
    // }
  },
  //点击企业服务，获取企业服务下方主题和部门数据
  company(type) {
    var _this = this;
    _this.currentFirstCatalog = type
    wx.request({
      url: 'https://jbzw.qimixi.net/api/Index/index?type=' + type,
      data: "",
      method: 'GET',
      success: function(res) {
        _this.setData({
          business_topic: res.data.data.topic,
          business_department: res.data.data.department
        })
      },
      fail: function(res) {
        console.log("fail");
        console.log(res);
      },
      complete: function(res) {
        console.log('submit complete');
        wx.hideLoading()
      }
    })
  },
  //点击进入列表
  goListDetail(e) {
    if (this.data.currentTab == 0) {
      this.setData({
        firstCatalog: 1,
        secondCatalog: e.currentTarget.dataset.id,
      })
    } else if (this.data.currentTab == 1) {
      this.setData({
        firstCatalog: 2,
        secondCatalog: e.currentTarget.dataset.id,
      })
    }
    wx.navigateTo({
      url: '../listDetail/listDetail?firstCatalog=' + this.data.firstCatalog + '&secondCatalog=' + this.data.secondCatalog
    });
  },
  // 更多
  goMore(e) {
    if (this.data.currentTab == 0) {
      wx.navigateTo({
        url: '../more/more?currentId=' + this.data.currentTab + '&typeId=' + e.currentTarget.dataset.type + "&firstCatalog=1"
      })
    } else if (this.data.currentTab == 1) {
      wx.navigateTo({
        url: '../more/more?currentId=' + this.data.currentTab + '&typeId=' + e.currentTarget.dataset.type + "&firstCatalog=0"
      })
    }
  },
  onePic() {
    wx.navigateTo({
      url: '/pages/onePic/onePic',
    })
  },
  toApplyPage() {
    wx.navigateTo({
      url: '/pages/apply/apply',
    })
  },
  toWebView(e) {
    var url = e.currentTarget.dataset.id;
    var toUrl = '';
    if (url.indexOf("?") == -1) {
      toUrl = escape(url + '?code=B&wechatArgs=' + app.globalData.session3rd)
    } else {
      toUrl = escape(url + '&code=B&wechatArgs=' + app.globalData.session3rd)
    }
    if (app.globalData.realname && app.globalData.mobile && app.globalData.credential_id) {
      wx.navigateTo({
        url: '/pages/webview/webview?url=' + toUrl
      })
    } else {
      //在auth页面重新拼接session3rd
      wx.navigateTo({
        url: '/pages/auth/auth?url=' + escape(url)
      })
    }
  },
  toApply() {
    wx.navigateTo({
      url: '/pages/apply/apply'
    })
  }
})