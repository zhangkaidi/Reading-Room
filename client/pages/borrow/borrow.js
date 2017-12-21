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
    var that = this;
    wx.request({
      url: "http://localhost:8085/api/getBorrowBooks",
      data: {
        user: app.globalData.userInfo.nickName
      },
      method: 'get',
      success: function (res) {
        var data = res.data
        that.setData({
          bookList: data
        })
      }
    })
  },
  //还书
  borrow: function (e) {
    var id = e.target.dataset.id,
      state = e.target.dataset.state,
      user = app.globalData.userInfo.nickName,
      that = this;
    if (state) {
      state = false
    } else {
      state = true
    };
    wx.request({
      url: "http://localhost:8085/api/updateBooks",
      data: {
        id: id,
        user: user,
        state: state
      },
      method: 'put',
      success: function (res) {
        if (res.data) {
          wx.showToast({
            title: '还书成功',
            icon: 'success',
            duration: 1000,
            success:function(){
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