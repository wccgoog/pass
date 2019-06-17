import { getUid } from './uid'
const app = getApp();

export function webView(e) {
  try {
    let uid = getUid();
    let toUrl = '';
    let url = e.currentTarget.dataset.id;
    if (url.indexOf("?") == -1) {
      toUrl = escape(url + '?code=A&uid=' + uid)
    } else {
      toUrl = escape(url + '&code=A&uid=' + uid)
    }
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + toUrl,
    });
  } catch (e) {
    if(e.toString()=="TypeError: Cannot read property 'uid' of null"){
      my.confirm({
        title:"请登录",
        content:"登录后即可网上申报和查询办件",
        confirmButtonText:"登录",
        success: (res) => {
          
        },
      });
    }
  }
}