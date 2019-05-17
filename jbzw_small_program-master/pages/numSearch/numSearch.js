// pages/numSearch/numSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  goOfficeList(){
    wx.navigateTo({
      url: '../officeList/officeList'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success(res) {
        wx.getUserInfo({
          success(resuserinfo) {
            wx.request({
              url: 'http://jbzw.qimixi.net/api/wechat',
              data: {
                code: res.code,
                encryptedData: resuserinfo.encryptedData,
                rawData: resuserinfo.rawData,
                iv: resuserinfo.iv,
                signature: resuserinfo.signature,
              },
              success: function (result) {
                var res = result.data;
                console.log(res);
                wx.setStorage({
                  key: 'session3rd',
                  data: res.data.session3rd,
                })
              }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  authinfo(e){
    console.log(e)
  },
  getPhoneNumber(e){
    console.log(e)
  }
})