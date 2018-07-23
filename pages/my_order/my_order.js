// pages/my_order/my_order.js
const Net = require('../../utils/NetRequest.js');
const util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var user = app.globalData.user
    //请求租用历史
    Net.queryOrderList(user.userId, function(data) {
      console.log(data)
      //清空数组
      that.data.orders.splice(0, that.data.orders.length)
      data.data.forEach(function(list, index) {
        console.log(list)
        that.data.orders.push({
          price: list.money.toFixed(2),
          status: 1,
          order_time: util.formatTime(new Date(list.startTime))
        })
      })
      that.setData({
        orders: that.data.orders
      })
    })
  }
})