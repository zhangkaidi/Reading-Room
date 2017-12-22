// pages/bookShow/bookShow.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList: []
  },
  //初识化
  init: function () {
    let that = this;
    wx.request({
      url: "http://localhost:8085/api/getBorrowBooks",
      data: {
        user: app.globalData.userInfo.nickName
      },
      method: 'get',
      success: res => {
        that.setData({
          bookList: res.data
        })
      }
    })
  },
  //还书
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
            title: '还书成功',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.init();
  }
})