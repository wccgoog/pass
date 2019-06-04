// pages/apply/apply.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreShow: true,
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
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=D",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289514896.png",
        name: "电影放映",
        detail: "电影放映相关事项"
      },
      {
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
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=F",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009274987.JPG",
        name: "文化演艺",
        detail: "文化演艺相关事项"
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=G",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009651180.png",
        name: "农业林业",
        detail: "农业林业相关事项"
      },
    ],
    itemList: [{
        title: "社会保障",
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
        title:"城市环保",
        items:[
          {
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
        title:"农林机械",
        items:[
          {
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=G",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009651180.png",
            name: "农业林业",
            detail: "农业林业相关事项"
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onload");
    this.setData({
      moreShow: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("onready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onshow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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