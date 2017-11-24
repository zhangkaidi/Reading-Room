# wxapp
<<<<<<< HEAD
## 记录遇到的问题
### 一:
> 问题：app.json中设置了tabBar为页面指定的页面A，在其他页面使用navigateTo无法实现跳转A页面
> 解决办法：navigateTo只能跳转到非导航页面，对于导航页面跳转可以用wx.switchTab
### 二：
> 问题：使用switchTab后tab不刷新
> 解决办法：
```
wx.switchTab({  
      url: '../index/index',  
      success: function (e) {  
        var page = getCurrentPages().pop();  
        if (page == undefined || page == null) return;  
        page.onShow();  
      }  
    })
```
=======
微信小程序
>>>>>>> b0beade31aef0440a624f1143b91e505dbf7529c
