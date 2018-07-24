// pages/share_history/share_history.js
var Net = require('../../utils/NetRequest.js');
const util = require('../../utils/util.js')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var user = app.globalData.user
    var that = this
    Net.queryShareHository(user.userId, function(data) {
      if (data.data.length == 0) {
        util.toast("暂无出租历史")
      } else {
        data.data.forEach(function(list, index) {
          console.log(list)
          var dayago = util.formatShortTime(new Date(list.createTime))
          var time = "租用时间:" + util.formatShortTime(new Date(list.startTime)) + " - " + util.formatShortTime(new Date(list.endTime))
          var devcieCode = "地锁编号:" + list.deviceId
          var address = "地址:" + list.address
          that.data.list.push({
            dayAgo: dayago,
            time: time,
            deviceCode: devcieCode,
            address: address
          })
        })
        that.setData({
          list: that.data.list
        })
      }

    })
  },
})