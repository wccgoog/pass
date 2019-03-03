//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: [],
    userLongitude: 118.78,
    markers: []
  },
  onLoad: function() {
    var thisPage = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        var markers = [{
          iconPath: app.globalData.iconPath,
          id: 0,
          latitude: latitude,
          longitude: longitude,
          width: 50,
          height: 50,
          callout: {
            content: "呀屎啦！" + (app.globalData.person == "刘醒" ? "梁非凡":app.globalData.userInfo.nickName  ),
            color: "#ff0000",
            fontSize: "16",
            borderRadius: "10",
            bgColor: "#ffffff",
            padding: "10",
          }
        }]
        thisPage.setData({
          userLongitude: longitude,
          userLatitude: latitude,
          markers:markers
        })
      }
    })
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(util.formatTime(new Date()) + "你点了" + app.globalData.person)
    wx.setStorageSync('logs', logs)
    this.setData({
      logs: (wx.getStorageSync('logs') || [])
    })
  }
})