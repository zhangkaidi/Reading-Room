// pages/bookShow/bookShow.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    userInfo: {}
  },
  init: function () {
    var that = this;
    wx.request({
      url: "http://localhost:8085/api/getBooks",
      data: {},
      method: 'get',
      success: function (res) {
        if (res) {
          that.setData({
            bookList: res.data
          })
        }
      }
    })
  },
  //扫描书籍信息
  scanBook: function () {
    var that = this;
    wx.scanCode({
      success: (res) => {
        var id = res.result;
        wx.request({
          url: "https://api.douban.com/v2/book/isbn/" + id,
          data: {},
          header: { 'Content-Type': 'application/x-www-form-urlencode' },
          success: function (res) {
            //跳转编辑页面
            var bookMessage = {
              id: id,
              user: "",
              title: res.data.title,
              author: res.data.author,
              imgMi: res.data.images.medium,
              publisher: res.data.publisher,
              summary: res.data.summary,
              price: res.data.price,
              state: false
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
  //借书
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
            title: '借阅成功',
            icon: 'success',
            duration: 1000,
            success: function () {
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
  onLoad:function(){
    wx.showLoading({
      title: '加载中'
    })
  }
})