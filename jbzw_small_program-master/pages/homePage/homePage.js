// pages/homePage/homePage.js
//获取应用实例  
var app = getApp()
Page({
  data: {
    //页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    //二级目录所用
    firstCatalog:'',
    secondCatalog:'',
    // 首页获取数据
    personal_topic:'',
    personal_department:'',
    //企业服务
    business_topic: '',
    business_department: '',
    // banner图
    background:[],
    // banner图相关配置
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500
  },
  // loading显示方法
  loading: function () {
    wx.showLoading({
      title: 'XXX',
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    var _this=this;
    //初始加载获取个人服务下方主题和部门数据
    wx.request({
      url: 'https://jbzw.qimixi.net/api/Index/index?type=1',
      data: "",
      method: 'GET',
      success: function (res) {
        _this.setData({
          personal_topic: res.data.data.topic,
          personal_department: res.data.data.department
        })
      },
      fail: function (res) {
        console.log("fail");
        console.log(res);
      },
      complete: function (res) {
        console.log('submit complete');
        wx.hideLoading()
      }
    })
    //请求首页banner图
    wx.request({
      url: 'https://jbzw.qimixi.net/api/banner/bannerList',
      data: "",
      method: 'POST',
      success: function (res) {
        let list = res.data.data.list;
        let listArr=[];
        for(var i in list){
          listArr.push(list[i].image)
        }
        _this.setData({
          background: listArr
        })
      }
    })
  },
  //滑动切换tab
  bindChange: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current==1){
      this.company(2);
    }else{
      this.company(1);
    }
  },
  //点击tab切换
  swichNav: function (e) {
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
  company(type){
    var _this = this;
    wx.request({
      url: 'https://jbzw.qimixi.net/api/Index/index?type='+type,
      data: "",
      method: 'GET',
      success: function (res) {
        _this.setData({
          business_topic: res.data.data.topic,
          business_department: res.data.data.department
        })
      },
      fail: function (res) {
        console.log("fail");
        console.log(res);
      },
      complete: function (res) {
        console.log('submit complete');
        wx.hideLoading()
      }
    }) 
  },
  //点击进入列表
  goListDetail(e){
    if (this.data.currentTab==0){
      this.setData({
        firstCatalog: 1,
        secondCatalog: e.currentTarget.dataset.id,
      })
    } else if (this.data.currentTab == 1){
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
  goMore(e){
    wx.navigateTo({
      url: '../more/more?currentId=' + this.data.currentTab+'&typeId='+e.currentTarget.dataset.type
    })
  }
})  