// pages/find_place/find_place.js
var amapFile = require('../../libs/amap-wx.js')
var myAmapFun
var longitude, latitude
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: {},
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myAmapFun = new amapFile.AMapWX({ key: 'bceeef2c04d6e5a4c33b3a981b26099e' });
  },

  onInputChange:function(e){
    var keywords = e.detail.value
    var that = this
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '',
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },

  onBindSelect:function(e){
    var keywords = e.target.dataset.keywords;
    var location = keywords.location.split(",")
    longitude = location[0]
    latitude = location[1]
    console.log(keywords.name + " " + longitude + " " + latitude)
    this.setData({
      inputValue:keywords.name
    })
  },

  onSearch:function(){
    var pages = getCurrentPages()
    pages[pages.length - 2].setData({
      latitude: latitude,
      longitude: longitude,
      scale: 16
    })
    wx.navigateBack({
      delta: 1,
    })
  }
})