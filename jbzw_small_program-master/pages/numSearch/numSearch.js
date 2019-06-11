// pages/numSearch/numSearch.js
import {
  webView
} from '../../utils/webView.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/newOffice.html?workType=S",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1552397437091.png",
        name: "在办件"
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/newOffice.html?workType=O",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1552397481205.png",
        name: "办结件"
      },
    ]
  },
  goOfficeList() {
    wx.navigateTo({
      url: '../officeList/officeList'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    webView(e)
  }
})