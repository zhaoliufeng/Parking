// pages/rent_confirm/rent_confirm.js
var Net = require('../../utils/NetRequest.js');
var app = getApp()
var deviceid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    parknum: "",
    price: 0,
    money: 0.00
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    deviceid = options.deviceid
    console.log("Address -> " + options.address +
      " ParkNum -> " + options.parkNum +
      " Price -> " + options.price +
      " DeviceId -> " + deviceid)
    this.setData({
      address: options.address,
      parknum: options.parkNum,
      price: options.price
    })
    var user = app.globalData.user
    var that = this
    //查询余额
    Net.queryUserWealth(user.userId, function(data) {
      console.log(data)
      that.setData({
        money: data.data.money.toFixed(2)
      })
    })
  },

  onConfirm: function() {
    var user = app.globalData.user

    Net.hireDevice(user.userId, deviceid, function(data) {
      console.log(data)
      if (data.statuscode == 200) {
        wx.switchTab({
          url: '/pages/rented_parking/rented_parking'
        })
      } else {
        wx.showToast({
          title: data.message,
          icon: 'none'
        })
      }
    })
  }
})