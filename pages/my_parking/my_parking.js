// pages/my_parking/my_parking.js
Page({


  data: {
    showDialog: true,
    lockCode: null,
    lock_tip:''
  },

  onLoad: function(options) {

  },
  onBind: function() {
    this.setData({
      showDialog: true
    })
  },
  onHideDialog: function(){
    this.setData({
      showDialog: false
    })
  },

  onScanQrCode:function(){
    console.log("扫描二维码")
    var that = this
    wx.scanCode({
      onlyFromCamera: true,
      success: function(res) {
        console.log(res.result)
        wx.showToast({
          title: res.result,
          icon: 'none'
        })
        //地锁编码校验
        if(that.checkLockCode(res.result)){
          that.setData({
            lockCode: res.result
          })
        }else{
          that.setData({
            lock_tip: '地锁编码格式错误'
          })
        }
       
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },

  onBindLock:function(){
    if (this.data.lockCode == null){
      this.setData({
        lock_tip: '地锁不存在'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/input_address_detail/input_address_detail'
    })
  },

  checkLockCode:function(code){
    if(code.length == 15){
      return true
    }
    return false
  },

  inputLockCode:function(e){
    this.data.lockCode = e.detail.value
  }
})