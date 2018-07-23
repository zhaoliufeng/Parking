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
    payWechat: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var user = app.globalData.user
    userId = user.userId
    var that = this
    //查询未支付的订单
    Net.queryNotPayOrder(userId, function(data) {
      console.log(data)
      if (data.data != null) {
        that.setData({
          address: data.data.address,
          orderId: data.data.orderId,
          money: data.data.money.toFixed(2)
        })
      }
    })
    console.log('payWechat --> ' + this.data.payWechat)
  },

  payWithWallet: function() {
    this.setData({
      payWechat: false
    })
  },

  payWithWechat: function() {
    this.setData({
      payWechat: true
    })
  },

  onConfirm: function() {
    var payWithWechat = this.data.payWechat
    console.log('payWechat --> ' + payWithWechat)
    
    if (payWithWechat) {
      //使用微信支付
      this.weChatPay()
    } else {
      //使用余额支付
      console.log("userId -> " + userId)
      Net.payWithWallet(userId, this.data.orderId, function(data) {
        console.log(data)
        if (data.statuscode = 200) {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
  },

  weChatPay: function() {
    console.log("pay with wechat")
    wx: wx.login({
      success: function(res) {
        Net.wechatLogin(res.code, function(data) {
          console.log(data)
          wx.requestPayment({
            timeStamp: Date.parse(new Date())/1000,
            nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
            package: '',
            signType: 'MD5',
            paySign: '',
          })
        })
      }
    })
  }
})