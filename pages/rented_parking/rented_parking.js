// pages/rented_parking/rented_parking.js
var Dec = require('../../utils/aesUnits.js');
var OpOrder = require('../../utils/op.js');
var Ble = require('../../utils/ble.js');
var interval
var lockStatus = 1
var lockStatusTemp = 0
Page({
  data: {
    bgPosition: 500
  },

  onLoad: function(options) {
    //判断蓝牙状态前需要先开启蓝牙
    Ble.openBleAdapter();
  },

  onGetConnect:function(){
    Ble.connectToDevice({
      success: function (item) {
        console.log("连接设备 " + item.name + " 成功")
        // Ble.sendMsg(Dec.Encrypt(OpOrder.getToken()))
      }
    });
  },

  onGetDisConnect:function(){
    Ble.disconnect()
  },

  onLocked: function() {
    console.log('升锁')
    Ble.sendMsg(Dec.Encrypt(OpOrder.lock()))
  },

  onUnlocked: function() {
    console.log('降锁')
    Ble.sendMsg(Dec.Encrypt(OpOrder.unLock()))
  },

  onGetToken: function(){
    console.log('获取token')
    Ble.sendMsg(Dec.Encrypt(OpOrder.getToken()))
  },

  onGetState: function(){
    console.log('获取锁状态')
    Ble.sendMsg(Dec.Encrypt(OpOrder.getState()))
  },

  onGetBatteryState:function(){
    console.log('获取锁电量')
    Ble.sendMsg(Dec.Encrypt(OpOrder.getBatteryState()))
  },

  onGetIMEI:function(){
    console.log('获取IMEI')
    Ble.sendMsg(Dec.Encrypt(OpOrder.getIMEI()))
  },

  onLockTap:function(){
    if (lockStatusTemp != lockStatus && lockStatus == 1) {
      lockStatusTemp = lockStatus
      console.log('升锁')
      Ble.sendMsg(Dec.Encrypt(OpOrder.lock()))
      
      var count = 1
      var that = this
     
      interval = setInterval(function () {
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
    } else if (lockStatusTemp != lockStatus && lockStatus == 0){
      lockStatusTemp = lockStatus
      console.log('降锁')
      Ble.sendMsg(Dec.Encrypt(OpOrder.unLock()))

      var count = 7
      var that = this
      interval = setInterval(function () {
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
  }
})