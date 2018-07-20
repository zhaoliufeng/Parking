//app.js
var storage = require('/utils/storageUitl.js')
var isLogin = 'false'
App({
  token:"",
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