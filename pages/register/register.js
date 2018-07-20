// pages/register/register.js
var Net = require('../../utils/NetRequest.js');
var Ble = require('../../utils/ble.js')
var uitl = require('../../utils/util.js')
var isReset
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",
    chptcha: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    isReset = options.reset
  },

  onAccountInput: function(e) {
    this.data.phone = e.detail.value
  },

  onPwInput: function(e) {
    this.data.password = e.detail.value
  },

  onVerInput: function(e) {
    this.data.chptcha = e.detail.value
  },

  //确认
  onConfirm: function() {
    console.log("confirm" + this.data.phone)
    var phone = this.data.phone
    var pwd = this.data.password
    var chptcha = this.data.chptcha
    if (this.inputCheck()) {
      if (!isReset) {
        Net.register(phone, pwd, chptcha, function(data) {
          console.log(data)
        })
      } else {
        Net.resetPwd(phone, pwd, chptcha, function(data) {
          console.log(data)
          if(data.statuscode == 200){
            wx.showToast({
              title: '修改成功',
              icon: 'none'
            })
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      }

    }
  },

  onGetVer: function() {
    //获取验证码
    console.log('获取验证码 ' + this.data.phone)
    var sendType = isReset ? 3 : 1
    console.log(sendType)
    Net.SMSSend(sendType, this.data.phone, function(data) {
      console.log(data)
      if (data.statuscode == 200) {
        uitl.toast('获取验证码成功')
      }
    })
  },

  inputCheck: function() {
    if (this.data.phone.length != 11) {
      uitl.toast('请确认手机格式')
      return false
    }

    if (this.data.password.length < 6 || this.data.password.length > 18) {
      uitl.toast('请确认密码格式')
      return false
    }

    if (this.data.chptcha.length != 6) {
      uitl.toast('请确认验证码格式')
      return false
    }
    return true
  }
})