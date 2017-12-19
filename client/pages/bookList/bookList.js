// pages/bookShow/bookShow.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookList:[]
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
              state:false
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
  borrow:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})