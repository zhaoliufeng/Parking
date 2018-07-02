// pages/license_plate/licenese_plate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plates:[{
      part: '浙C',
      pNumber: 'BC969'
    }, {
        part: '粤A',
        pNumber: 'Q0267'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  onAddPlate:function(e){
    console.log("添加车牌")
    wx.navigateTo({
      url: '/pages/plate_add/plate_add'
    })
  },

  onDeletePlate:function(e){
    var row = e.currentTarget.dataset.row
    var that = this;
    console.log("删除车牌 " + this.data.plates[row].part + "·" + this.data.plates[row].pNumber)
    wx.showModal({
      title: '删除车牌',
      content: '确定删除车牌 ' + this.data.plates[row].part + "·" + this.data.plates[row].pNumber,
      confirmColor: "#FD7543",
      success: function (res) {
        if (res.confirm) {
          console.log('确定删除')
          //删除成功
          that.data.plates.splice(row, 1);
          that.setData({
            plates: that.data.plates
          })
        } else if (res.cancel) {
          console.log('取消删除')
        }
      }
    })
  }
  
})