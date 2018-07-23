// pages/more_funcation/more_funcation.js
var Net = require('../../utils/NetRequest.js');
var app = getApp()
var deviceId
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    deviceId = options.deviceId
  },
  onItemTap: function(e) {
    let selectRow = e.currentTarget.dataset.row
    var that = this
    console.log(selectRow)
    switch (selectRow) {
      case '0':
        console.log("延长出租")
        wx.navigateTo({
          url: '/pages/share_device/share_device?delayShare=true'
        })
        break
      case '1':
        console.log("停止发布")
        var user = app.globalData.user;
        Net.stopShareDevice(user.userId, deviceId, function (data) {
          console.log(data)
          
        })
        break
      case '2':
        console.log("发布历史")
        wx.navigateTo({
          url: '/pages/share_history/share_history'
        })
        break
      case '3':
        console.log("帮助")
        //跳转网页
        break
      case '4':
        console.log("计费规则")
        //跳转网页
        break
    }
  }
})