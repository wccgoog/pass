// pages/listDetail/listDetail.js
import utils from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstCatalog:'',
    secondCatalog:'',
    title:'',
    list:'',
    id:'',
    // 控制图片的显示隐藏
    imgHide:true,
    //判断是否扫码进入
    scanEnter: null
  },
  goListDetail(e){
    this.setData({
      id: e.currentTarget.dataset.id,
    })
    if (this.data.scanEnter==1){
      wx.navigateTo({
        url: '../guide/guide?id=' + this.data.id + '&scanEnter=1'
      });
      return;
    }
    wx.navigateTo({
      url: '../guide/guide?id=' + this.data.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("listDetail--onLoad:",options)
    if (options.scanEnter){
      this.setData({
        scanEnter: options.scanEnter,
      })
    }
    this.setData({
      firstCatalog: options.firstCatalog,
      secondCatalog: options.secondCatalog,
    })
    //显示加载效果
    wx.showLoading({
      title: '加载中',
    })
    var _this = this;
    wx.request({
      url: 'https://jbzw.qimixi.net/api/Index/affList',
      data: {
        'type': this.data.firstCatalog,
        'sid': this.data.secondCatalog
      },
      method: 'GET',
      success: function (res) {
        console.log("listDetail.js",res.data.data)
        if (res.data.data.list == "" || res.data.data.list==null){
          _this.setData({
            imgHide:false
          })
        }else{
          _this.setData({
            imgHide: true
          })
        }
        _this.setData({
          title: res.data.data.title,
          list: res.data.data.list
        })
      },
      fail: function (res) {
        console.log("fail");
      },
      complete: function (res) {
        wx.hideLoading()
        console.log('submit complete');
      }
    }) 
  },
})