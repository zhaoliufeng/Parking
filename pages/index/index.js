//index.js
var Net = require('../../utils/NetRequest.js');
//获取应用实例
const app = getApp()
var amapFile = require('../../libs/amap-wx.js')
//当前显示信息的marker id
var showMarkerId;
var mapCtx;
var currMarker;
Page({
  data: {
    markers: [],
    cicle: [{
      latitude: '26.55329',
      longitude: '113.88308',
      color: 'ffffffff',
      fillColor: '7cb5ec88',
      radius: 2000,
      strokeWidth: '3'
    }],
    price: '',
    markerAddress: '',
    showLockInfo: false,
    scale: 14,
    distance: 0,
    latitude: '22.55329',
    longitude: '113.88308',
    locatMarginTop: '-180rpx',
    textData: {}
  },

  //地图marker点击事件
  makertap: function(e) {
    console.log('marker tap ' + e.markerId)
    showMarkerId = e.markerId
    if (!this.data.showLockInfo) {
      this.setData({
        locatMarginTop: '-360rpx',
        showLockInfo: true,
      })
    }
    currMarker = this.data.markers.find(function(marker) {
      return marker.id = showMarkerId
    })

    console.log(currMarker)
    var that = this
    Net.queryValid(currMarker.deviceId, function(data) {
      console.log(data)
      var currPrice = data.data.freeset / data.data.moneyhour
      that.setData({
        price: currPrice.toFixed(2),
        markerAddress: currMarker.address,
        distance: currMarker.distance.toFixed(2)
      })
    })
  },

  maptap: function() {
    //点击地图 如果显示了锁的详情信息则收起
    if (this.data.showLockInfo) {
      this.setData({
        locatMarginTop: '-180rpx',
        showLockInfo: false
      })
    }
  },
  onguide: function() {
    console.log("导航到此处")
    var that = this
    wx.openLocation({
      latitude: Number(currMarker.latitude),
      longitude: Number(currMarker.longitude),
      scale: 14,
      address: currMarker.address
    })
  },

  onrent: function() {
    console.log("立即租用")
    wx.navigateTo({
      url: '/pages/rent_confirm/rent_confirm?address=' + currMarker.address + '&parkNum=' + currMarker.param1 + "&price=" + this.data.price + "&deviceid=" + currMarker.deviceId
    })
  },

  onLoad: function() {
    var that = this;
    this.mapCtx = wx.createMapContext('map');
    this.onlocate();
  },

  //定位当前终端位置
  onlocate: function() {
    console.log("定位当前位置")
    var that = this
    //请求当前位置
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 14,
          //修改范围圆的中心坐标
          cicle: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: 'ffffffff',
            fillColor: '#7cb5ec88',
            radius: 2000,
            strokeWidth: '3'
          }]
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '定位失败',
          icon: 'none'
        })
      },
      complete: function(res) {},
    })
  },

  //输入查找地点
  onFindPlace: function() {
    //跳转搜索
    console.log("查找位置")
    wx.navigateTo({
      url: '/pages/find_place/find_place',
    })
  },

  /**
   * 拖动地图触发
   */
  mapDrag: function() {
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log('中心点纬度 ：' + res.longitude)
        console.log('中心点经度 ：' + res.latitude)
        that.setData({
          cicle: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: 'ffffffff',
            fillColor: '#7cb5ec88',
            radius: 2000,
            strokeWidth: '3'
          }]
        })
        Net.queryScopeList(res.latitude, res.longitude, function(data) {
          console.log(data)
          //清空数组
          that.data.markers.splice(0, that.data.markers.length)
          data.data.forEach(function(markers, index) {
            console.log(markers)
            that.data.markers.push({
              latitude: markers.latitude,
              longitude: markers.longitude,
              iconPath: '../../img/poi_selected.png',
              address: markers.devicenote,
              deviceId: markers.deviceId,
              id: markers.id,
              param1: markers.param1,
              distance: markers.distance,
              width: 27,
              height: 27
            })
          })

          that.setData({
            markers: that.data.markers
          })
        })
      }
    })
  }
})