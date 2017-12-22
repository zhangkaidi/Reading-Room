// pages/book/book.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookMessage: {}
  },
  checkId: function () {
    let that = this;
    let bookId = this.data.bookMessage.id;
    wx.request({
      url: "http://localhost:8085/api/getBorrowBooksId",
      data: {
        id: bookId
      },
      success: res => {
        if (res.data) {
          wx.showModal({
            title: '提示',
            content: '此书存在，是否扫描其它书籍？',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack();
                app.scanBook();
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
    let data = this.data.bookMessage;
    wx.request({
      url: "http://localhost:8085/api/createBooks",
      data: data,
      method: 'post',
      success: res => {
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
    let obj = JSON.parse(options.str);
    this.setData({
      bookMessage: obj
    })
  }
})