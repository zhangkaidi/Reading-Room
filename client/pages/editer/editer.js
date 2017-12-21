var util = require('../../utils/util.js')
Page({
  data: {
    text: {},//记录数据
    storageKey: "key" //本地存储key
  },
  editerId: function (data, i) {
    data.splice(i, 1);
    return data
  },
  //提交所编辑的数据
  bindFormSubmit: function (e) {
    var that = this,
      id = util.getUnixTime(), //数据id
      time = util.getLocalTime(id),//时间time
      text = e.detail.value.textarea,//内容
      editerId = e.currentTarget.dataset.id,//编辑时对应的id
      storage = wx.getStorageSync(that.data.storageKey)||[],//取本地存储的数据
      content = { id: id, time: time, text: text };//存储数据
    if(text==""){
      return;
    }
    //是否有编辑的数据
    if (editerId) {
      var i = e.currentTarget.dataset.i;//编辑时对应数据的index
      that.editerId(storage, i);
    }
    //存储数据
    storage.unshift(content);
    wx.setStorageSync(that.data.storageKey, storage);
    //编辑完成跳转列表页面
    wx.switchTab({
      url: '../notes/notes',
    })
  },
  onLoad: function (options) {
    //页面加载，判断有无其他页面传递的参数
    var that = this;
    if (options.id == undefined) {
      return
    } else { //通过列表页，传递需要的编辑文件的参数
      var data = wx.getStorageSync(that.data.storageKey), //有数据，直接去数据进行操作
        user = {
        };
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == options.id) {
          user.text = data[i].text;
          user.id = data[i].id;
          user.i = i;
        }
      }
      //传递参数，setdata给user
      this.setData({
        text: user
      })
    }
  }
})
