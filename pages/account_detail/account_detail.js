// pages/account_detail/account_detail.js
//输入模式 0昵称 1手机号 2年龄
var inputType = 0
//输入框输入值
var inputValue
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avaterPath: '../../img/account_info.jpg',
    showDialog: false,
    dialogTitle: '昵称',
    inputPlaceholder: '请输入昵称',
    uesrInfo: '',
    nickName:'Zhaoliufeng',
    phone: 13000000000,
    age:22
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
        inputType = 0
        that.setData({
          showDialog: true,
          dialogTitle: '昵称',
          inputPlaceholder: '请输入昵称'
        })
        break;
      case '2':
        console.log("修改手机号")
        inputType = 1
        wx.showToast({
          title: '目前暂不能更改手机号',
          icon:'none'
        })
        return
        that.setData({
          showDialog: true,
          dialogTitle: '手机号',
          inputPlaceholder: '请输入手机号'
        })
        break;
      case '3':
        console.log("修改年龄")
        inputType = 2
        that.setData({
          showDialog: true,
          dialogTitle: '年龄',
          inputPlaceholder: '请输入年龄'
        })
        break;
    }
  },

  onHideDialog: function() {
    this.setData({
      showDialog: false
    })
  },

  onConfirm: function() {
    switch (inputType) {
      case 0:
        console.log('保存昵称')
        this.setData({
          showDialog: false,
          nickName:inputValue
        })
        break
      case 1:
        console.log('保存手机')
        this.setData({
          showDialog:false,
          phone: inputValue
        })
        break
      case 2:
        console.log('保存年龄')
        this.setData({
          showDialog: false,
          age: inputValue
        })
        break
    }
  },

  onInput:function(e){
    inputValue = e.detail.value
  }
})