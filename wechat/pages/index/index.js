//index.js
//获取应用实例
const app = getApp()

Page({
  changeMotto() {
    app.globalData.person = "你自己"
    this.setData({
      name: app.globalData.userInfo.nickName,
      avatarUrl: this.data.userInfo.avatarUrl
    })
  },
  data: {
    motto: "吔屎啦! ",
    name: "梁非凡",
    visitTimes: 0,
    avatarUrl: "../../images/liangfeifan.jpg",
    isShow:"hide",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    wx.onNetworkStatusChange(res=> {
      this.setData({
        name: res.networkType,
      })
    })
    var visitTimes = wx.getStorageSync('visitTimes')
    if (visitTimes % 5 == 0) {
      app.globalData.person = "佟dark为"
      app.globalData.iconPath = "../../images/van.jpg"
      this.setData({
        name: "佟dark为",
        avatarUrl: "../../images/van.jpg"
      })
    }
  },
  //下拉刷新，每五次会出现van
  onPullDownRefresh: function() {
    var visitTimes = wx.getStorageSync('visitTimes')
    if (visitTimes % 5 == 0) {
      app.globalData.person = "佟dark为"
      app.globalData.iconPath = "../../images/van.jpg"
      this.setData({
        name: "佟dark为",
        avatarUrl: "../../images/van.jpg",
        visitTimes: "Deep♂Dark♂Fantasy"
      })
    } else {
      app.globalData.person = "刘醒"
      app.globalData.iconPath = "../../images/liangfeifan.jpg"
      this.setData({
        name: "梁非凡",
        avatarUrl: "../../images/liangfeifan.jpg",
        visitTimes: visitTimes % 5
      })
    }
    visitTimes = visitTimes + 1
    wx.setStorageSync('visitTimes', visitTimes)
    wx.stopPullDownRefresh()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      isShow:"show",
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})