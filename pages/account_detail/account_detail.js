// pages/account_detail/account_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avaterPath: '../../img/account_info.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  //列表点击事件 0 我的钱包 1 收益情况 2 我的订单 3 设置 4 消息
  onItemTap: function(e) {
    let selectRow = e.currentTarget.dataset.row
    var that = this
    console.log(selectRow)
    switch (selectRow) {
      case '0':
        console.log("修改头像")
        wx.chooseImage({
          success: function(res) {
            console.log("选择图片 " + res.tempFilePaths);
            console.log("tempFilePaths " + res.tempFilePaths + " files " + res.tempFiles)
            that.setData({
              avaterPath: res.tempFilePaths
            })
          },
        })
        break;
      case '1':
        console.log("修改昵称")
        break;
      case '2':
        console.log("修改手机号")
        break;
      case '3':
        console.log("修改年龄")
        break;
    }
  }
})