// pages/book/book.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookMessage: {}
  },
  checkId: function () {
    var that = this;
    var bookId = this.data.bookMessage.id;
    wx.request({
      url: "http://localhost:8085/api/getBorrowBooksId",
      data: {
        id: bookId
      },
      success: function (res) {
        if (res.data) {
          wx.showModal({
            title: '提示',
            content: '此书存在，是否重新扫描添加？',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../bookList/bookList',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          that.publishBook();
        }
      }
    })
  },
  publishBook: function () {
    var data = this.data.bookMessage;
    wx.request({
      url: "http://localhost:8085/api/createBooks",
      data: data,
      method: 'post',
      success: function (res) {
        if (res) {
          //编辑完成跳转列表页面
          wx.switchTab({
            url: '../bookList/bookList',
          })
        }
      }
    })
  },
  onLoad: function (options) {
    var obj = JSON.parse(options.str);
    this.setData({
      bookMessage: obj
    })
  }
})