const app = getApp()

export function webView(e) {
  console.log("webview=====", app.globalData.isLogin);
  if (app.globalData.isLogin == false) {
    //未登录状态
    wx.showModal({
      title: '请登录',
      content: '登录后即可网上申报和查询办件',
      confirmText:'登录',
      success: (res) => {
        console.log(res)
        if (res.confirm) {
          app.globalData.isJump = 1;
          wx.navigateTo({
            url: '/pages/numSearch/numSearch'
          })
        }
      }
    })
    // wx.login({
    //   success(res) {
    //     app.globalData.code = res.code;
    //     wx.getUserInfo({
    //       success(resuserinfo) {
    //         let userInfo = JSON.parse(resuserinfo.rawData)
    //         console.log(userInfo)
    //         //登录第三方系统返回用户已留存的信息
    //         app.globalData.nickName = userInfo.nickName;
    //         app.globalData.avatar = userInfo.avatarUrl;
    //         if (app.globalData.nickName != app.globalData.constNickName && app.globalData.avatar != app.globalData.constAvatar) {
    //           app.globalData.isLogin = true;
    //         } else {
    //           app.globalData.isLogin = false;
    //         }
    //       }
    //     })
    //   }
    // });
  } else {



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
                },
                fail(e) {
                  console.log(e);
                  wx.navigateTo({
                    url: '/pages/auth/auth?url=' + escape(url)
                  })
                }
              })
            }
          });
        }
      }
    })

  }
}

function goToWebView(url) {
  let toUrl = '';
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