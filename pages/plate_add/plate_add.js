// pages/plate_add/plate_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [
      ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏',
      '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂',
      '琼', '渝', '川', '黔', '滇', '藏', '秦', '陇', '青', '宁',
      '新', '港', '澳', '台'], 
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 
      'H', 'I', 'J', 'K', 'L', 'M', 'N', 
      'O', 'P', 'Q', 'R', 'S', 'T', 'U', 
      'V', 'W', 'X', 'Y', 'Z']],
    multiIndex: [0, 0],
    part:'京A',
    plateNumber: ''
  },

  onSelectPart:function(){
   
  },

  bindPickerChange:function(e){
    console.log('选择的车牌号地域编码为',
     this.data.multiArray[0][e.detail.value[0]] + this.data.multiArray[1][e.detail.value[1]])
  },

  bindPickerColumnChange:function(e){
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    this.setData({
      multiIndex: [e.detail.column, e.detail.value]
    })
  },

  onConfirm:function(){
    console.log('保存车牌号');
    
    this.setData({
      plateNumber: this.data.plateNumber
    })
    console.log(this.data.plateNumber)
    if(this.data.plateNumber.length != 5){
      wx.showToast({
        title: '请确认车牌号',
        icon: 'none'
      })
    }

    //上传车牌号 update
    
    wx.navigateBack({
      //回跳页数
      delta: 1,
    })
  },

  onInput:function(e){
    this.setData({
      plateNumber: e.detail.value
    })
  }
})