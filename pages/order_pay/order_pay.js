// pages/order_pay/order_pay.js
var Net = require('../../utils/NetRequest.js');
var app = getApp()
var userId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    orderId: "",
    money: 0,
    payWithWechat: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = app.globalData.user
    userId = user.userId
    var that =this
    //查询未支付的订单
    Net.queryNotPayOrder(userId, function (data){
      console.log(data)
      if(data.data != null){
        that.setData({
          address: data.data.address,
          orderId: data.data.orderId,
          money: data.data.money.toFixed(2)
        })
      }
    })
  },

  onConfirm:function(){
    getApp().cancelPayOrder != getApp().cancelPayOrder
    if (this.data.payWithWechat){
     
    }else{
      //使用余额支付
      console.log("userId -> " + userId)
      Net.payWithWallet(userId, this.data.orderId, function (data) {
        console.log(data)
        if(data.statuscode = 200){
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
  }
})