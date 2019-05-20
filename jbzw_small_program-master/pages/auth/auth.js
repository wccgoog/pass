// pages/auth/auth.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoShow: true,
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
          url: 'https://jbzw.qimixi.net/api/wechat_pay/getPhoneNumber',
          data: {
            encryptedData: res.detail.encryptedData,
            iv: res.detail.iv,
            session3rd: storageres.data
          },
          success: function(result) {
            app.globalData.mobile = result.data.data.mobile;
            var url = that.data.url;
            var toUrl = '';
            if (url.indexOf("?") == -1) {
              toUrl = escape(url + '?code=B&wechatArgs=' + storageres.data)
            } else {
              toUrl = escape(url + '&code=B&wechatArgs=' + storageres.data)
            }
            if (app.globalData.realname && app.globalData.mobile && app.globalData.credential_id) {
              console.log(toUrl)
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
    var that = this;
    wx.getStorage({
      key: 'session3rd',
      success: function(storageres) {
        console.log(storageres);
        wx.request({
          url: 'https://jbzw.qimixi.net/api/wechat_pay/getCredentialInfo',
          data: {
            auth_token: res.detail.auth_token,
            session3rd: storageres.data
          },
          success: function(result) {
            wx.showToast({
              title: 'success',
            })
            app.globalData.realname = result.data.data.realname;
            app.globalData.credential_id = result.data.data.credential_id;
            that.setData({
              authShow: false
            })
          }
        })
      },
      fail: (e) => {
        wx.showModal({
          title: 'getStorage',
          content: 'none'
        })
      }
    })
  },
  userInfo(resuserinfo) {
    var that = this;
    console.log(resuserinfo);
    wx.login({
      success: (res) => {
        wx.showToast({
          title: 'success',
        });
        wx.request({
          url: 'https://jbzw.qimixi.net/api/wechat',
          method: 'GET',
          data: {
            code: res.code,
            encryptedData: resuserinfo.detail.encryptedData,
            rawData: resuserinfo.detail.rawData,
            iv: resuserinfo.detail.iv,
            signature: resuserinfo.detail.signature,
          },
          success: function(result) {
            wx.showToast({
              title: 'request',
            })
            var res = result.data;
            console.log(res);
            wx.setStorage({
              key: 'session3rd',
              data: res.data.session3rd,
            })
            that.setData({
              userInfoShow: false
            })
          }
        })
      },
      fail: (e) => {
        wx.showToast({
          title: 'fail',
        })
      }
    })
  }
})