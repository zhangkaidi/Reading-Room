Page({
  data: {
    storageKey: "key",//本地存储key
    notes: [] //记录列表
  },
  //删除数据
  remove: function (event) {
    var that = this;
    var removeId = event.currentTarget.dataset.removeid;//通过data- 获取删除的id
    var i = event.currentTarget.dataset.index;//通过data- 获取删除的index
    var key = that.data.notes;//取数据
    key.splice(i, 1);//删除数据
    this.setData({
      notes: key
    });//重新渲染页面
    //
    wx.setStorageSync(that.data.storageKey, key);
  },
  //跳转编辑页面
  editer: function (event) {
    var id = event.currentTarget.dataset.editerid;
    wx.navigateTo({
      url: '../editer/editer?id=' + id
    });
  },
  //跳转增加页面
  add: function () {
    wx.redirectTo({
      url: '../editer/editer'
    })
  },
  //页面加载
  onLoad: function () {
    var that = this;
    this.setData({
      notes: wx.getStorageSync(that.data.storageKey)
    })
  }
})
