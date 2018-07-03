// pages/setting/setting.js
var storage = require('../../utils/storageUitl.js')
var unlockTypeArr = ['自动降锁', '手动降锁']
Page({

  data: {
    swcithChecked: true,
    unlockType: '自动降锁'
  },

  onLoad: function(options) {
    var that = this
    storage.getUnlockConfig(function (autoUnlockType){
      console.log("autoUnlockType: " + autoUnlockType)
      that.setData({
        unlockType: autoUnlockType
      })
    })
  },

  //列表点击事件 0 我的钱包 1 收益情况 2 我的订单 3 设置 4 消息
  onItemTap: function(e) {
    let selectRow = e.currentTarget.dataset.row
    var that = this
    console.log(selectRow)
    switch (selectRow) {
      case '0':
        console.log("降锁方式")
        wx.showActionSheet({
          itemList: unlockTypeArr,
          success: function(res) {
            let index = res.tapIndex
            that.setData({
              unlockType: unlockTypeArr[index]
            })
            storage.saveUnlockConfig(unlockTypeArr[index])
          }
        })
        break;
      case '1':
        console.log("我的车牌")
        wx.navigateTo({
          url: '/pages/license_plate/licenese_plate',
        })
        break;
      case '2':
        console.log("服务协议")
        break;
      case '3':
        console.log("操作流程")
        break;
      case '4':
        console.log("常用问题解答")
        break;
      case '5':
        console.log("专享停车简介")
        break;
    }
  },

  onSwitchChange: function(e) {
    console.log("自动结账 " + e.detail.value)
  }
})