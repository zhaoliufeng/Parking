//用户登录
const KEY_USER_LOGIN = "key_user_login"
const KEY_USER_NAME = "key_user_name"
const KEY_USER_ID = "key_user_id"

const KEY_AUTO_UNLOCK = "key_auto_unlock"

class StorageUtil {

  //保存用户登录状态
  static saveUserLoginState(isLogin) {
    wx.setStorage({
      key: KEY_USER_LOGIN,
      data: isLogin,
      success: function(res) {
        console.log("保存用户登录状态成功 当前状态: " + isLogin)
      },
      fail: function(res) {
        console.log("保存用户登录状态失败 当前状态: " + isLogin)
      },
      complete: function(res) {},
    })
  }

  //获取用户登录状态
  static getUserLoginState() {
    wx: wx.getStorage({
      key: KEY_USER_LOGIN,
      success: function(res) {
        console.log("获取用户登录状态成功 当前状态: " + res.data)
        return res.data
      },
      fail: function(res) {
        console.log("获取用户登录状态失败 ErrorMsg " + res.errMsg)
      },
      complete: function(res) {},
    })
  }

  //保存用户名
  static saveUserName(userName) {
    wx.setStorage({
      key: KEY_USER_NAME,
      data: userName,
      success: function(res) {
        console.log("保存用户名成功 当前用户名: " + userName)
      },
      fail: function(res) {
        console.log("保存用户名失败")
      },
      complete: function(res) {},
    })
  }

  //获取用户名
  static getUserName() {
    wx: wx.getStorage({
      key: KEY_USER_NAME,
      success: function(res) {
        console.log("获取用户名成功 当前用户名: " + res.data)
        return res.data
      },
      fail: function(res) {
        console.log("获取用户名失败 ErrorMsg " + res.errMsg)
      },
      complete: function(res) {},
    })
  }
  //保存用户id
  static saveUserId(userId) {
    wx.setStorage({
      key: KEY_USER_ID,
      data: userId,
      success: function(res) {
        console.log("保存用户ID成功 当前用户名: " + userId)
      },
      fail: function(res) {
        console.log("保存用户ID失败")
      },
      complete: function(res) {},
    })
  }

  //获取用户id
  static getUserId() {
    wx: wx.getStorage({
      key: KEY_USER_ID,
      success: function(res) {
        console.log("获取用户ID成功 当前用户ID: " + res.data)
        return res.data
      },
      fail: function(res) {
        console.log("获取用户ID失败 ErrorMsg " + res.errMsg)
      },
      complete: function(res) {},
    })
  }
  
  //保存降锁配置
  static saveUnlockConfig(autoUnlockType) {
    wx.setStorage({
      key: KEY_AUTO_UNLOCK,
      data: autoUnlockType,
      success: function(res) {
        console.log("保存降锁配置成功 autoUnlockType: " + autoUnlockType)
      },
      fail: function(res) {
        console.log("保存降锁配置失败 autoUnlockType: " + autoUnlockType)
      },
      complete: function(res) {},
    })
  }

  //获取降锁配置
  static getUnlockConfig(success) {
    wx.getStorage({
      key: KEY_AUTO_UNLOCK,
      success: function(res) {
        console.log("获取降锁配置成功 autoUnlockType: " + res.data)
        success(res.data)
      },
      fail: function(res) {
        console.log("获取降锁配置失败 autoUnlockType: " + res.data)
      }
    })
  }
}

module.exports = StorageUtil