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
  publishBook:function(){
    var data = this.data.bookMessage
    wx.request({
      url: "http://localhost:8085/api/createBooks",
      data: data,
      method: 'post', 
      success: function (res) {
          if(res){
            //编辑完成跳转列表页面
            wx.switchTab({
              url: '../bookList/bookList',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
          }
      }
    })
  },
  onLoad: function (options) {
    var obj = JSON.parse(options.str)
    console.log(obj);
    this.setData({
      bookMessage: obj
    })
  }
})