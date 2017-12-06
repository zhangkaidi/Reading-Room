// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookMessage:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var obj = JSON.parse(options.str)
    this.setData({
      bookMessage: obj
    })
  }
})