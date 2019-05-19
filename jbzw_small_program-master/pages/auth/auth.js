// pages/auth/auth.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authShow: true,
    mobileShow: true,
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.realname && app.globalData.credential_id) {
      this.setData({
        authShow: false
      })
    }
    console.log(options);
    this.setData({
      url: unescape(options.url)
    });
    console.log(this.data.url);
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
  getPhoneNumber(res) {
    var that = this;
    console.log("getPhoneNumber:", res);
    //记录encryptedData,iv 现在暂时用不到了2019/5/19
    // app.globalData.encryptedData = res.detail.encryptedData;
    // app.globalData.iv = res.detail.iv;
    wx.getStorage({
      key: 'session3rd',
      success: function(storageres) {
        wx.request({
          url: 'http://jbzw.qimixi.net/api/wechat_pay/getPhoneNumber',
          data: {
            encryptedData: res.detail.encryptedData,
            iv: res.detail.iv,
            session3rd: storageres.data
          },
          success: function(result) {
            var res = result.data;
            console.log('getPhoneNumber---', res);
            app.globalData.mobile = result.data.data.mobile;
            var toUrl = escape(that.data.url);
            if (app.globalData.realname && app.globalData.mobile && app.globalData.credential_id) {
              wx.navigateTo({
                url: '/pages/webview/webview?url=' + toUrl
              })
            }
          }
        })
      },
    })
  },
  authinfo(res) {
    wx.getStorage({
      key: 'session3rd',
      success: function(storageres) {
        wx.request({
          url: 'http://jbzw.qimixi.net/api/wechat_pay/getCredentialInfo',
          data: {
            auth_token: res.detail.auth_token,
            session3rd: storageres.data
          },
          success: function(result) {
            var res = result.data;
            app.globalData.realname = result.data.realname;
            app.globalData.credential_id = result.data.credential_id;
            console.log('authinfo---', res);
          }
        })
      },
    })
  }
})