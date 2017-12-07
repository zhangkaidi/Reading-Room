//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '心情随笔，记录点滴',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //调发票助手
  invoiceAssistant: function () {
    wx.chooseInvoiceTitle({
      success(res) {
      }
    })
  },
  //扫描书籍信息
  scanBook: function () {
    var that = this;
    wx.scanCode({
      success: (res) => {
        var data = res.result;
        wx.request({
          url: "https://api.douban.com/v2/book/isbn/" + data,
          data: {},
          header: { 'Content-Type': 'application/x-www-form-urlencode' },
          success: function (res) {
            //跳转编辑页面
            var bookMessage = {
              title :res.data.title,
              author : res.data.author,
              imgMi :res.data.images.medium,
              publisher : res.data.publisher,
              summary :res.data.summary,
              price : res.data.price
            },
            str = JSON.stringify(bookMessage);
            wx.navigateTo({
              url: '../book/book?str=' + str
            })
          }
        })
      }
    })
  },
  onLoad: function () {
    //console.log(app.globalData);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})