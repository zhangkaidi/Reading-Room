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
  onLoad: function () {
    let that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  control: function () {
    wx.navigateTo({
      url: '../borrow/borrow'
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
