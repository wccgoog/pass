// pages/onePic/onePic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: [
      "https://jbxqalipay.nanjingdata.cn/image/onePic1.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/onePic2.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/onePic3.jpg"
    ],
    smallPic: [
      "https://jbxqalipay.nanjingdata.cn/image/smallPic1.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/smallPic2.jpg",
      "https://jbxqalipay.nanjingdata.cn/image/smallPic3.jpg"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  previewPic(event){
    // console.log(event.currentTarget.id)
    wx.previewImage({
      current: "https://jbxqalipay.nanjingdata.cn/image/onePic" + event.currentTarget.id + ".jpg",
      urls: this.data.pic,
    })
  }
})