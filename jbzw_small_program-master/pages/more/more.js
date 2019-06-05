Page({
  data: {
    title: true,
    typeDepart: "",
    list:"",
    firstCatalog:""
  },
  onLoad: function (options) {
    console.log("进入更多页面：",options)
    var _this=this;
    this.setData({
      firstCatalog: options.firstCatalog
    })
    //一级判断
    if (options.currentId == 0) {
      this.setData({
        title: true
      })
      wx.setNavigationBarTitle({
        title: '个人服务'
      })
      if (options.typeId == 0){
        wx.request({
          url: 'https://jbzw.qimixi.net/api/index/topicList',
          data: {
            'type': 1
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            _this.setData({
              list: res.data.data
            })
          }
        })
      }
    } else if (options.currentId == 1) {
      this.setData({
        title: false
      })
      wx.setNavigationBarTitle({
        title: '企业服务'
      })
      if (options.typeId == 0) {
        wx.request({
          url: 'https://jbzw.qimixi.net/api/index/topicList',
          data: {
            'type': 2
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            _this.setData({
              list: res.data.data
            })
          }
        })
      }
    }
    //二级判断
    if (options.typeId == 0){
      this.setData({
        typeDepart: "主 题"
      })
    } else if (options.typeId == 1){
      this.setData({
        typeDepart: "部 门"
      })
      wx.request({
        url: 'https://jbzw.qimixi.net/api/index/departmentList',
        data: {
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          _this.setData({
            list:res.data.data
          })
        }
      })
    }
  },
  //点击进入列表
  goListDetail(e) {
    console.log(this.data.typeDepart)
    if (this.data.typeDepart =="主 题"){
      wx.navigateTo({
        url: '../listDetail/listDetail?firstCatalog=' + this.data.firstCatalog + '&secondCatalog=' + e.currentTarget.dataset.id
      });
    } else if (this.data.typeDepart == "部 门"){
      wx.navigateTo({
        url: '../listDetail/listDetail?firstCatalog=' + this.data.firstCatalog + '&secondCatalog=d' + e.currentTarget.dataset.id
      });
    }
  },
})