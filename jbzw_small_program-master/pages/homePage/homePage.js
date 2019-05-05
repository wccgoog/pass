// pages/homePage/homePage.js
import md5 from "../../utils/md5.js"
import base64 from "../../utils/base64.js"
import util from "../../utils/util.js"
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
    background: ["https://jbxqalipay.nanjingdata.cn/image/tb1.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb2.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb3.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb4.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb5.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/tb6.jpg"],
    // banner图相关配置
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    webViewUrl: ''
  },
  // loading显示方法
  loading: function () {
    wx.showLoading({
      title: 'XXX',
    })
  },
  onShow(){
    // this.setData({ webViewUrl: 'http://queuing.nanjingdata.cn/booking/index-systemid-10000-userid-b0xwYmcweDRSSE5qU2VkZk12TG5od045RnNJZw-myToken-fc9a4ecc74a47504d1b8d1ac3f08ca49.html' });
    // 获取openid
    // wx.login({
    //   success(res) {
    //     console.log(res)
    //     if (res.code) {
    //       // 发起网络请求
    //       wx.request({
    //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=' + res.code +'&       grant_type=authorization_code',
    //         data: {
    //           code: res.code
    //         },
    //         success(res) {
    //           console.log(res)
    //           // app.globalData.openId=
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
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
    // wx.request({
    //   url: 'https://jbzw.qimixi.net/api/banner/bannerList',
    //   data: "",
    //   method: 'POST',
    //   success: function (res) {
    //     let list = res.data.data.list;
    //     let listArr=[];
    //     for(var i in list){
    //       listArr.push(list[i].image)
    //     }
    //     _this.setData({
    //       background: listArr
    //     })
    //   }
    // })
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
  },
  showOpenId(){
    let openid = app.globalData.openid;
    console.log(openid);
    let base = new base64();
    let userid = base.encode(app.globalData.openid);
    // userid = userid.substring(0, userid.length - 2);
    // userid = 'MTIzMzMyMQ'
    console.log("base64:"+userid);
    userid = base.encodeBase64URLSafeString(userid)
    console.log("encodeBase64URLSafeString:" + userid);

    // let testStr = "++--//==abc";
    // console.log(testStr + "encodeBase64URLSafeString:" + base.encodeBase64URLSafeString(testStr))

    // let token = userid + app.globalData.today + "wssmall_jszq";
    let token = userid + app.globalData.today + "wssmall_jszq";
    console.log(token);
    token = md5.hex_md5(token);
    console.log(token);
    let url = 'http://queuing.nanjingdata.cn/booking/index-systemid-10002-userid-'+userid+'-myToken-'+token+'.html'
    console.log(url);

  }
})  