// pages/rented_parking/rented_parking.js
var Net = require('../../utils/NetRequest.js');
var Dec = require('../../utils/aesUnits.js');
var OpOrder = require('../../utils/op.js');
var Ble = require('../../utils/ble.js');
var app = getApp()
var interval
var lockStatus = 1
var lockStatusTemp = 0
//当前锁的坐标
var latitude
var longitude
var deviceId
var interval
var haveGSM
Page({
  data: {
    rentParking: true,
    money: 0,
    address: '地址',
    plateId: 'B1--',
    bgPosition: 500,
    notPay: false,
    parkTime: '0分钟'
  },

  onLoad: function(options) {
    //获取网络状态 如果有网络则使用gsm进行开锁 如果没有则使用本地蓝牙开锁
    wx.getNetworkType({
      success: function(res) {
        if (res.networkType == 'none') {
          haveGSM = false
        } else {
          haveGSM = true
        }
        console.log(res.networkType + " --> haveGSM -- " + haveGSM)
      }
    })
    //判断蓝牙状态前需要先开启蓝牙
    Ble.openBleAdapter();
  },

  onShow: function() {
    var user = app.globalData.user
    var that = this
    //先检查是否有未支付的订单 如果有则先处理之前的订单
    //查询未支付的订单
    Net.queryNotPayOrder(user.userId, function(data) {
      //有未支付的订单
      console.log(data)
      if (data.data != null) {
        console.log("有未支付的订单")
        that.setData({
          notPay: true
        })
      } else {
        that.setData({
          notPay: false
        })
      }
      that.queryState()
      console.log("notPay >> " + that.data.notPay + " rentParking >> " + that.data.rentParking)
      if (!that.data.notPay && that.data.rentParking) {
        console.log("开始轮询设备状态")
        //如果有未结清的订单则不需要去请求当前的设备状态
        interval = setInterval(function () {
          that.queryState()
        }, 5000)
      }
    })
  },

  onHide: function() {
    clearInterval(interval)
  },

  //查询当前租用状态
  queryState: function() {
    console.log("查询当前租用信息")
    var user = app.globalData.user
    var that = this
    //查询当前租用状态
    Net.queryDeviceOrder(user.userId, function(data) {
      console.log(data)
      if (data.data == null) {
        that.setData({
          rentParking: false
        })
      } else {
        deviceId = data.data.deviceId
        var parkTime = data.data.allTimeHour == null ? 0 : data.data.allTimeHour
        that.setData({
          rentParking: true,
          parkTime: parkTime.toFixed(2) + '小时',
          address: data.data.address,
          plateId: data.data.plateId,
          money: data.data.money.toFixed(2)
        })

        Net.queryDeviceState(deviceId, function(device) {
          console.log("锁状态")
          console.log(data)
          latitude = device.latitude
          longitude = device.longitude
        })
      }

    })
  },

  onguide: function() {
    wx.openLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      scale: 14,
      address: this.data.address
    })
  },

  onGetConnect: function() {
    Ble.connectToDevice({
      success: function(item) {
        console.log("连接设备 " + item.name + " 成功")
      }
    });
  },

  onGetDisConnect: function() {
    Ble.disconnect()
  },

  //立即租用
  onRent: function() {
    wx.switchTab({
      url: '../index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onLocked: function() {
    console.log('升锁')
    Ble.sendMsg(Dec.Encrypt(OpOrder.lock()))
  },

  onUnlocked: function() {
    console.log('降锁')
    Ble.sendMsg(Dec.Encrypt(OpOrder.unLock()))
  },

  onGetToken: function() {
    console.log('获取token')
    Ble.sendMsg(Dec.Encrypt(OpOrder.getToken()))
  },

  onGetState: function() {
    console.log('获取锁状态')
    Ble.sendMsg(Dec.Encrypt(OpOrder.getState()))
  },

  onGetBatteryState: function() {
    console.log('获取锁电量')
    Ble.sendMsg(Dec.Encrypt(OpOrder.getBatteryState()))
  },

  onGetIMEI: function() {
    console.log('获取IMEI')
    Ble.sendMsg(Dec.Encrypt(OpOrder.getIMEI()))
  },

  onLockTap: function() {
    //开关锁时上报锁状态
    var user = app.globalData.user

    if (haveGSM) {
      //同步锁状态
      Net.lockDeviceCloud(user.userId, 3, deviceId, function() {
        console.log(data)
      })
    }
    console.log(lockStatusTemp + " " + lockStatus)
    if (lockStatusTemp != lockStatus && lockStatus == 1) {
      lockStatusTemp = lockStatus
      console.log('升锁')
      var user = app.globalData.user

      if (haveGSM) {
        Net.lockDeviceCloud(user.userId, 1, deviceId, function() {
          console.log(data)
        })
      } else {
        Ble.sendMsg(Dec.Encrypt(OpOrder.lock()))
      }


      var count = 1
      var that = this

      interval = setInterval(function() {
        console.log(count)
        that.setData({
          bgPosition: count * 500
        })
        count++
        if (count == 8) {
          clearInterval(interval)
          lockStatus = 0
        }

      }, 100)
    } else if (lockStatusTemp != lockStatus && lockStatus == 0) {
      lockStatusTemp = lockStatus
      console.log('降锁')
      if (haveGSM) {
        Net.lockDeviceCloud(user.userId, 0, deviceId, function(data) {
          console.log(data)
        })
      } else {
        Ble.sendMsg(Dec.Encrypt(OpOrder.unLock()))
      }
      var count = 7
      var that = this
      interval = setInterval(function() {
        console.log(count)
        that.setData({
          bgPosition: count * 500
        })
        count--
        if (count == 0) {
          clearInterval(interval)
          lockStatus = 1
        }

      }, 100)
    }
  },

  lock: function() {
    if (lockStatus == 1) {
      this.onLockTap()
    }
  },

  unlock: function() {
    if (lockStatus == 0) {
      this.onLockTap()
    }
  },

  stopHire: function() {
    var user = app.globalData.user
    Net.stopHireDevice(user.userId, deviceId, function(data) {
      console.log(data)
      if (data.statuscode == 200) {
        // 跳转到支付界面
        wx.navigateTo({
          url: '/pages/order_pay/order_pay',
        })
      }
    })
  },

  toPayOrder: function() {
    wx.navigateTo({
      url: '/pages/order_pay/order_pay',
    })
  }
})