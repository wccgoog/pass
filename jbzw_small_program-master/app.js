//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // wx.checkSession({
    //   success:function(){

    //   },
    //   fail:function(){
    //     wx.login({
    //       success:function(res){

    //         var code = res.code;
    //         wx.getUserInfo({
    //           wx.request({
    //             url: '服务器地址',
    //           })
    //         })
    //       }
    //     })
    //   }
    // })
    var that = this
    // 登录
    wx.login({
      success: res => {
        // console.log(res)

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code //返回code
        // console.log(code)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxf0f0298a0ad564f6&secret=a48f666969ce34f8990d2b39c3ecb397&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          // header: {
          //   'content-type': 'application/json'
          // },
          success: function(res) {
            // console.log(res)
            let openid = res.data.openid //返回openid
            let session_key = res.data.session_key //返回openid
            that.globalData.openid = openid;
            that.globalData.isLogin = true;
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log("getUserInfo获取内容")
              // console.log(res)
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
    encryptedData: '',
    iv: '',
    code: '',
    session3rd: '',
    mobile:'',
    credential_id:'',
    realname:''
  }
})