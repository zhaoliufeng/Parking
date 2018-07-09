// pages/login/login.js
var Net = require('../../utils/NetRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputAccount: '',
    inputPw: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  onConfirm: function() {
    console.log(this.data.inputAccount)
    var account = this.data.inputAccount
    var passoword = this.data.inputPw
    Net.login(account, passoword, function(data) {
        console.log(data.message)
      })
  },

  onAccountInput: function(e) {
    this.data.inputAccount = e.detail.value
  },

  onPwInput: function(e) {
    this.data.inputPw = e.detail.value
  },

  onRegister: function() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },

  onFindPw: function() {
    wx.navigateTo({
      url: ''
    })
  }

})