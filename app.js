//app.js
var storage = require('/utils/storageUitl.js')
var isLogin = false
App({
  token: "",
  onLaunch: function () {
    isLogin = storage.getUserLoginState()
  }
})