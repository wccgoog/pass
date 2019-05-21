// pages/homePage/homePage.js
//获取应用实例  
var app = getApp()
Page({
  data: {
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
    duration: 500
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
    })
    //首页小圆圈漂浮
    console.log(wx.getSystemInfoSync().windowWidth)
    setInterval(() => {
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
    }, 100)
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
  //滑动切换tab
  bindChange: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    if (e.detail.current == 1) {
      this.company(2);
    } else {
      this.company(1);
    }
  },
  //点击tab切换
  swichNav: function(e) {
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
    wx.navigateTo({
      url: '../more/more?currentId=' + this.data.currentTab + '&typeId=' + e.currentTarget.dataset.type + "&firstCatalog=" + this.currentFirstCatalog
    })
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