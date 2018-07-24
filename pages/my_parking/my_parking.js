// pages/my_parking/my_parking.js
var Net = require('../../utils/NetRequest.js');
const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    unBindDevice: false,
    showDialog: false,
    lockCode: null,
    lock_tip: '',
    devices: []
  },

  onLoad: function(options) {
    this.queryDevice()
  },

  onShow:function(){
    this.queryDevice()
  },

  //查询用户已绑定设备
  queryDevice: function() {
    var user = app.globalData.user;
    console.log(user)
    if (user.nickname != undefined) {
      var that = this
      Net.queryDeviceByUserId(user.userId, function(data) {
        if (data.data.length == 0) {
          console.log("沒有绑定车位")
          that.setData({
            unBindDevice: true
          })
        } else {
          console.log(data)
          //清空数组
          that.data.devices.splice(0, that.data.devices.length)
          data.data.forEach(function(device, index) {
            console.log(device)
            var status = device.status == 0 ? '状态:租用中' : '状态:闲置中'
            that.data.devices.push({
              address: device.devicenote,
              status: status,
              deviceId: device.deviceId
            })
          })
          that.setData({
            unBindDevice: false,
            devices: that.data.devices
          })
        }
      })
    } else {
      console.log("沒有登录")
      this.setData({
        unBindDevice: true
      })
    }

  },

  onBind: function() {
    this.setData({
      showDialog: true
    })
  },

  onHideDialog: function() {
    this.setData({
      showDialog: false
    })
  },

  onScanQrCode: function() {
    console.log("扫描二维码")
    var that = this
    wx.scanCode({
      onlyFromCamera: true,
      success: function(res) {
        console.log(res.result)
        //地锁编码校验
        if (that.checkLockCode(res.result)) {
          that.setData({
            lockCode: res.result
          })
        } else {
          that.setData({
            lock_tip: '地锁编码格式错误'
          })
        }

      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },

  onBindLock: function() {
    console.log(this.data.lockCode)
    if (this.data.lockCode == null ||
      this.data.lockCode.length == 0) {
      this.setData({
        lock_tip: '请输入地锁编号'
      })
      return
    }
    var user = app.globalData.user;
    var that = this
    Net.activeDevice(user.userId, this.data.lockCode, 2, function(data) {
      if(data.statuscode == 400){
        that.setData({
          lock_tip: '设备不存在'
        })
        return
      }
      if(data.statuscoe == 300){
        that.setData({
          lock_tip: '设备已激活'
        })
        return
      }
    })

    wx.navigateTo({
      url: '/pages/input_address_detail/input_address_detail?deviceId=' + data.data.deviceId
    })
  },

  checkLockCode: function(code) {
    if (code.length == 15) {
      return true
    }
    return false
  },

  inputLockCode: function(e) {
    this.data.lockCode = e.detail.value
  },

  shareDevice: function(e) {
    var deviceId = e.currentTarget.dataset.listid
    console.log("deviceId --> " + deviceId)
    wx.navigateTo({
      url: '/pages/share_device/share_device?deviceId=' + deviceId
    })
  },

  stopShareDevice: function(e) {
    var deviceId = e.currentTarget.dataset.listid
    var user = app.globalData.user;
    Net.stopShareDevice(user.userId, deviceId, function(data) {
      //500 错误
    })
  },

  moreFuncation: function(e) {
    console.log("更多功能")
    var deviceId = e.currentTarget.dataset.listid
    wx.navigateTo({
      url: '/pages/more_funcation/more_funcation?deviceId=' + deviceId
    })
  }
})