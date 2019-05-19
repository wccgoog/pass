// pages/apply/apply.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authShow: true,
    mobileShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
    console.log("----------------", app.globalData.encryptedData, app.globalData.iv, app.globalData.session3rd)
    var url = e.currentTarget.dataset.id;
    if (url.indexOf("?") == -1) {
      url = url + "?wechat=1"
    }
    var toUrl = escape(url + '&wechatArgs=' + app.globalData.session3rd)
    if (app.globalData.realname && app.globalData.mobile && app.globalData.credential_id) {
      wx.navigateTo({
        url: '/pages/webview/webview?url=' + toUrl
      })
    } else {
      wx.navigateTo({
        url: '/pages/auth/auth?url=' + toUrl
      })
    }
  }
})