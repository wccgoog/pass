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
    var that = this;
    wx.login({
      success(res) {
        app.globalData.code = res.code;
        console.log('login---', res);
        wx.getUserInfo({
          success(resuserinfo) {
            console.log('getUserInfo---', resuserinfo);
            //登录第三方系统返回用户已留存的信息
            wx.request({
              url: 'http://jbzw.qimixi.net/api/wechat',
              data: {
                code: res.code,
                encryptedData: resuserinfo.encryptedData,
                rawData: resuserinfo.rawData,
                iv: resuserinfo.iv,
                signature: resuserinfo.signature,
              },
              success: function(result) {
                var res = result.data;
                console.log('request---http://jbzw.qimixi.net/api/wechat', res);
                //记录session3rd到app.globalData
                app.globalData.session3rd = res.data.session3rd
                wx.setStorage({
                  key: 'session3rd',
                  data: res.data.session3rd,
                })
                //未获取到手机号,则显示绑定手机号码按钮
                if (!res.data.user_info.mobile) {
                  this.setData({
                    mobileShow: true
                  })
                }
              },
              fail(e) {
                console.log('request failed');
              }
            })
          },
          fail(e) {
            console.log('getUserInfo failed----------', e);
            that.setData({
              authShow: true,
              mobileShow: true
            })
          }
        })
      },
      fail(e) {
        console('login failed', e)
      }
    })
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
    var toUrl = escape(url + '&wechatArgs={"encryptedData":"' + app.globalData.encryptedData + '","iv":"' + app.globalData.iv + '",         "session3rd":"' + app.globalData.session3rd + '"}')
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + toUrl
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
            console.log('authinfo---', res);
            that.onLoad;
          }
        })
      },
    })
  },
  getPhoneNumber(res) {
    var that = this;
    console.log("getPhoneNumber:", res);
    //记录encryptedData,iv
    app.globalData.encryptedData = res.detail.encryptedData;
    app.globalData.iv = res.detail.iv;
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
            that.onLoad;
          }
        })
      },
    })
  },
  getPhoneNumber1(res) {
    var that = this;
    console.log("getPhoneNumber:", res);
    console.log("data-set:", res.currentTarget);
    //记录encryptedData,iv
    app.globalData.encryptedData = res.detail.encryptedData;
    app.globalData.iv = res.detail.iv;
    console.log("----------------", app.globalData.encryptedData, app.globalData.iv, app.globalData.session3rd)
    var url = res.currentTarget.dataset.id;
    if (url.indexOf("?") == -1) {
      url = url + "?wechat=1"
    }
    var toUrl = escape(url + '&wechatArgs={"encryptedData":"' + app.globalData.encryptedData + '","iv":"' + app.globalData.iv + '",         "session3rd":"' + app.globalData.session3rd + '"}')
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + toUrl
    })
  }
})