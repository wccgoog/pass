const app = getApp()

export function webView(e) {
  var url = e.currentTarget.dataset.id;
  wx.request({
    url: 'https://jbzw.qimixi.net/api/user/getUserInfo',
    data: {
      session3rd: app.globalData.session3rd
    },
    success: (res) => {
      if (res.data.code == 1) {
        console.log("状态未过期===========================", res)
        goToWebView(url)
      } else if (res.data.code == 0) {
        console.log("状态过期,重新登录===========================", res)
        wx.login({
          success(res) {
            app.globalData.code = res.code;
            wx.getUserInfo({
              success(resuserinfo) {
                //登录第三方系统返回用户已留存的信息
                wx.request({
                  url: 'https://jbzw.qimixi.net/api/wechat',
                  data: {
                    code: res.code,
                    encryptedData: resuserinfo.encryptedData,
                    rawData: resuserinfo.rawData,
                    iv: resuserinfo.iv,
                    signature: resuserinfo.signature,
                  },
                  success: function(result) {
                    console.log(result);
                    //记录session3rd到app.globalData
                    app.globalData.session3rd = result.data.data.session3rd;
                    app.globalData.realname = result.data.data.user_info.realname;
                    app.globalData.mobile = result.data.data.user_info.mobile;
                    app.globalData.credential_id = result.data.data.user_info.credential_id;
                    wx.setStorage({
                      key: 'session3rd',
                      data: result.data.data.session3rd,
                    })
                    console.log(app.globalData.session3rd);
                    goToWebView(url)
                  }
                })
              }
            })
          }
        });
      }
    }
  })

}

function goToWebView(url){
  let toUrl='';
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
}