//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var visitTimes = wx.getStorageSync('visitTimes') || 0
    visitTimes = visitTimes + 1
    wx.setStorageSync('visitTimes', visitTimes)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx643ff0edec8ea096&secret=91a19909a5338bd3be7f31b6749b7f86&js_code=' + res.code +'&grant_type=authorization_code',
            data: {
              // code: res.code
            },
            success: res => {
              console.log(res.data.openid)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    person:"刘醒",
    iconPath: "../../images/liangfeifan.jpg"
  }
})