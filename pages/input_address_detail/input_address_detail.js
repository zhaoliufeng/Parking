// pages/input_address_detail/input_address_detail.js
var Net = require('../../utils/NetRequest.js');
const util = require('../../utils/util.js')
var app = getApp()

var addressDetail
var code
var deviceId
var latitude
var longitude
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    deviceId = options.deviceId
  },

  onAddressTap: function() {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        latitude = res.latitude
        longitude = res.longitude
        that.setData({
          address: res.address
        })
      }
    })
  },

  onInputAddressDetail: function(e) {
    addressDetail = e.detail.value
  },

  onInputCode: function(e) {
    code = e.detail.value
  },

  onUpload: function() {
    var user = app.globalData.user;
    var devicenote = this.data.address + addressDetail
    //上传车位信息
    Net.updateGPS(user.userId, deviceId,
      longitude, latitude, devicenote, code,
      function(data) {
        console.log(data)
        if (data.statuscode == 200) {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
  }
})