//app.js
var storage = require('/utils/storageUitl.js')
App({
  rentParking: true,
  token: "",
  //全局保存当前的支付情况 判断是否有取消支付订单的情况 如果有在下一次进入租用界面时 跳转到支付界面
  cancelPayOrder: false,
  globalData: {
    user: {}
  },
  onLaunch: function() {
    var that = this
    storage.getUserInfo(function(data) {
      that.globalData.user = data
      console.log(that.globalData.user)
    })
  }
})