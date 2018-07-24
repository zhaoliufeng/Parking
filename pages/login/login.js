// pages/login/login.js
var Net = require('../../utils/NetRequest.js');
var storage = require('../../utils/storageUitl.js')

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
      if (data.statuscode == 200) {
        //登录成功
        storage.saveUserId(data.data.id)
        var subData = data.data
        var user = {
          userId: subData.id,
          nickname: subData.nickname,
          username: subData.username,
          email: subData.email
        }
        //保存用户信息
        storage.saveUserInfo(user)
        //保存登录状态
        storage.saveUserLoginState(true)
        getApp().globalData.user = user
        wx.showToast({
          title: "登录成功",
          icon: 'none'
        })
        wx.navigateBack({
          delta: 1,
        })
      } else {
        console.log(data.message)
        wx.showToast({
          title: data.message,
          icon: 'none'
        })
      }
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
      url: '/pages/register/register?reset=false'
    })
  },

  onFindPw: function() {
    wx.navigateTo({
      url: '/pages/register/register?reset=true'
    })
  }

})