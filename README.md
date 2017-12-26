# wxapp
## 演示
# 
## 功能
* 借书还书
> * 通过扫一扫，添加书籍信息到数据库中。`注`：若数据库中已存在该条书籍信息，则提示不能重复添加，返回扫一扫页面。
> * 在书库页面中显示所有书籍信息。（图片、名称、简介、作者、出版社、价格、订阅状态）
> * 通过点击借阅，添加到用户的借阅记录页面。`注`：若书籍状态已经是借阅中，则不能再操作，否则，可点击借阅。
> * 在用户借阅页面，点击还书，改变书籍借阅状态。
 
* 备忘录
> * 备忘录添加页面。
> * 备忘录显示页面(时间，内容)。
> * 通过点击某条备忘录信息，进入编辑页面，对该条备忘录进行编辑，再次保存。
> * 删除备忘录。

* 发票助手
> * 调用发票助手API

* 客服
> * 调用客服API
> 
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
### 三：
> 问题：页面之间传对象参数

> 解决办法：A-->B A页面传递参数先JSON.stringify(data)，B页面接收参数先JSON.parse(data)


