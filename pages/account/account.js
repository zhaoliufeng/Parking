// pages/account/account.js

Page({
  data: {
    accountAvater: '../../img/account_info.jpg',
    accountName: 'Zhaoliufeng',
    accountPhone: '18720424911'
  },
  onLoad: function() {},

  //列表点击事件 0 我的钱包 1 收益情况 2 我的订单 3 设置 4 消息
  onItemTap: function(e) {
    let selectRow = e.currentTarget.dataset.row
    console.log(selectRow)
    switch (selectRow) {
      case '0':
        console.log('账户余额')
        // wx.navigateTo({
        //   url: '',
        // })
        break;
      case '1':
        console.log('收益情况')
        // wx.navigateTo({
        //   url: '',
        // })
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

  onAccountTap:function(){
    console.log('账户信息')
    wx.navigateTo({
      url: '/pages/account_detail/account_detail',
    })
  }
})