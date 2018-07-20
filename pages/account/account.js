// pages/account/account.js
var storage = require('../../utils/storageUitl.js')
var app = getApp()
var isLogin = false
Page({
  data: {
    accountAvater: '../../img/account_info.jpg',
    accountName: '未登录',
    accountPhone: ''
  },
  onLoad: function() {
   
  },

  onShow: function() {
    console.log(app.globalData.user)
    
    if (app.globalData.user.nickname != undefined) {
      isLogin = true
      var user = app.globalData.user
      //登录状态 显示用户名 用户手机号
      this.setData({
        accountName: user.nickname,
        accountPhone: user.email
      })
    } else {
      //未登录
    }
  },
  //列表点击事件 0 我的钱包 1 收益情况 2 我的订单 3 设置 4 消息
  onItemTap: function(e) {
    let selectRow = e.currentTarget.dataset.row
    console.log(selectRow)
    if (!isLogin) {
      //没有登录 就先进登录界面
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    switch (selectRow) {
      case '0':
        console.log('账户余额')

        //登录 微信重置支付
        wx.login({
          success: function(res) {
            console.log("登录返回code " + res.code)
          },
          fail: function(res) {},
          complete: function(res) {},
        })
        break;
      case '1':
        console.log('收益情况')
        wx.showToast({
          title: '暂无收益',
          icon: 'none'
        })
        break;
      case '2':
        console.log('我的订单')
        wx.navigateTo({
          url: '/pages/my_order/my_order',
        })
        break;
      case '3':
        console.log('设置')
        wx.navigateTo({
          url: '/pages/setting/setting',
        })
        break;
      case '4':
        console.log('消息')
        wx.navigateTo({
          url: '/pages/message/message',
        })
        break;
    }
  },

  onAccountTap: function() {
    console.log('账户信息')
    if (isLogin) {
      wx.navigateTo({
        url: '/pages/account_detail/account_detail',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }
})