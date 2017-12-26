//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    let that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  login:function(){
  
  },
  //扫描书籍信息
  scanBook: function () {
    let that = this;
    wx.scanCode({
      success: res => {
        let id = res.result;
        wx.request({
          url: "https://api.douban.com/v2/book/isbn/" + id,
          data: {},
          header: { 'Content-Type': 'application/x-www-form-urlencode' },
          success: res => {
            //跳转编辑页面
            let bookMessage = {
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
  globalData: {
    userInfo: null
  }
})