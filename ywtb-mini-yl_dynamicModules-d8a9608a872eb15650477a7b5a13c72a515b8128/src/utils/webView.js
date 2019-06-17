import { getUid } from './uid'
const app = getApp();

export function webView(e) {
  latestUsed(e);
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
    if (e.toString() == "TypeError: Cannot read property 'uid' of null") {
      my.confirm({
        title: "请登录",
        content: "登录后即可网上申报和查询办件",
        confirmButtonText: "登录",
        success: (res) => {

        },
      });
    }
  }
}

//最近使用
export function latestUsed(e) {
  let globalLatestUsed = app.globalData.latestUsed;
  console.log(globalLatestUsed)
  if (e.currentTarget.dataset.index != undefined && e.currentTarget.dataset.itemsindex != undefined) {
    var latest = [e.currentTarget.dataset.index, e.currentTarget.dataset.itemsindex]
    let flag = 0;
    let index = 0;
    for (let i = 0; i < globalLatestUsed.length; i++) {
      if (globalLatestUsed[i].toString() == latest.toString()) {
        flag = 1;
        index = i;
        break;
      }
    }
    if (flag == 1) {
      console.log(globalLatestUsed[index])
      globalLatestUsed.unshift(globalLatestUsed[index]);
      globalLatestUsed.splice(index + 1, 1);
      console.log(globalLatestUsed)
    } else if (flag == 0) {
      globalLatestUsed.unshift(latest);
      globalLatestUsed.pop();
    }
  }

  if (e.currentTarget.dataset.latest != undefined) {
    let index = e.currentTarget.dataset.latest;
    globalLatestUsed.unshift(globalLatestUsed[index]);
    globalLatestUsed.splice(e.currentTarget.dataset.latest + 1, 1);
  }
}