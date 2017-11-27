Page({
  data: {
    storageKey: "key",//本地存储key
    notes: []//记录列表,
  },
  removeKey: function (key, i) {
    key.splice(i, 1)
    return key
  },
  //删除数据
  remove: function (event) {
    var that = this,
      removeId = event.currentTarget.dataset.removeid,//通过data- 获取删除的id
      i = event.currentTarget.dataset.index,//通过data- 获取删除的index
      key = that.data.notes;//取数据
    that.removeKey(key, i);//删除数据
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
    wx.navigateTo({
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
