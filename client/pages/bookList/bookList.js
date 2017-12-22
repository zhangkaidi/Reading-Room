// pages/bookShow/bookShow.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList: []
  },
  init: function () {
    let that = this;
    wx.request({
      url: "http://localhost:8085/api/getBooks",
      data: {},
      method: 'get',
      success: res => {
        if (res) {
          that.setData({
            bookList: res.data
          })
        }
      }
    })
  },
  scanBook: function () {
    app.scanBook();
  },
  //借书
  borrow: function (e) {
    let that = this;
    let state = e.target.dataset.state;
    if (state) {
      state = false
    } else {
      state = true
    };
    wx.request({
      url: "http://localhost:8085/api/updateBooks",
      data: {
        id: e.target.dataset.id,
        user: app.globalData.userInfo.nickName,
        state: state
      },
      method: 'put',
      success: res => {
        if (res.data) {
          wx.showToast({
            title: '借阅成功',
            icon: 'success',
            duration: 1000,
            success: () => {
              that.init();
            }
          })
        }
      }
    })
  },
  onReady: function () {
    wx.hideLoading()

  },
  onShow: function () {
    this.init();
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中'
    })
  }
})