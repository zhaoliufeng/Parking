// pages/input_address_detail/input_address_detail.js
var addressDetail
var code
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
  onLoad: function (options) {
    
  },

  onAddressTap:function(){
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log("位置名称 " + res.name + "详细地址 " + res.address)
        that.setData({
          address: res.address
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onInputAddressDetail:function(e){
    addressDetail = e.detail.value
  },

  onInputCode:function(e){
    code = e.detail.value
  },

  onUpload:function(){
    //上传车位信息
    wx.navigateBack({
      delta: 1,
    })
  }
})