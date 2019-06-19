import {getAuthUserInfo} from '../services/my';

const app = getApp();

export function authLogin() {
  let _this = this;
  my.getAuthCode({
    scopes: 'auth_user',
    success: (resAuth) => {
      my.getAuthUserInfo({
        success: (res) => {
          app.globalData.nickName = res.nickName;
          app.globalData.avatar = res.avatar;
          app.globalData.isLogin = true;
          my.navigateTo({
            url: '/pages/personal-center/index'
          })
        },
        fail: (e) => {
          console.log(e)
        }
      });
    },
    fail: (e) => {
      console.log(e)
    }
  });
}