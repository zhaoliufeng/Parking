// pages/share_device/share_device.js
var Net = require('../../utils/NetRequest.js')
var app = getApp()
var time
var price
var overTimePrice
var deviceId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delayShare: false,
    date: '2018-07-23',
    time: '12:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    deviceId = options.deviceId
    if (options.delayShare != undefined) {
      this.setData({
        delayShare: options.delayShare
      })
    }
  },

  onDateChange: function(e) {
    console.log(e.detail)
    this.setData({
      date: e.detail.value
    })
  },

  onTimeChange: function(e) {
    console.log(e.detail)
    this.setData({
      time: e.detail.value
    })
  },

  timeInput: function(e) {
    time = e.detail.value
  },

  priceInput: function(e) {
    price = e.detail.value
  },

  overTimePriceInput: function(e) {
    overTimePrice = e.detail.value
  },

  onConfirm: function() {
    console.log("Date --> " + this.data.date +
      " Time --> " + this.data.time +
      " PTime --> " + time +
      " PPrice --> " + price +
      " POvertimePrice --> " + overTimePrice)

    var startTime = Date.parse(new Date())
    var endTime = Date.parse(new Date(this.data.date + " " + this.data.time))
    if (startTime > endTime) {
      wx.showToast({
        title: '请留出足够的时间',
        icon: 'none'
      })
      return
    }
    console.log("startTime --> " + startTime + " endTime --> " + endTime)
    var user = app.globalData.user

    if (this.data.delayShare) {
      Net.shareDevice(user.userId, deviceId,
        startTime, endTime,
        function(data) {
          if(data.statuscode == 200){
            wx.showToast({
              title: '延时发布成功',
              icon: 'none'
            })
            wx.navigateBack({
              delta: 1,
            })
          }
        })
    } else {
      if (time == undefined ||
        price == undefined ||
        overTimePrice == undefined) {
        wx.showToast({
          title: '请输入出租信息',
          icon: 'none'
        })
        return
      }
      Net.shareDevice(user.userId, deviceId,
        startTime, endTime,
        time, price, overTimePrice,
        function(data) {
          if (data.statuscode == 200) {
            wx.navigateBack({
              delta: 1,
            })
          }
        })
    }
  },

  onCancel: function() {
    wx.navigateBack({
      delta: 1,
    })
  }
})