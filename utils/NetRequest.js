const BASE_URL = 'http://39.108.219.86:8080/tcw/'
//用户
const USER_LOGIN = 'user/login'
const USER_REGISTER = 'user/register'
const USER_REST_PWD = 'user/resetPwd'
//查询用户余额
const USER_WEALTH = 'user/queryUserWealth'
//查询用户当前未支付订单
const USER_NOT_PAY_ORDER = 'device/queryDeviceOrderOver'
//查询用户当前已完成的订单
const USER_ORDER_LIST = 'device/queryDeviceOrderHostorylist'
//用户余额支付
const USER_PAY_WITH_WALLET = 'order/leftPayOrder'

//手机短信验证码
const SMS_SEND = 'sendsms/send'
//查询已租信息
const CURRER_ORDER = 'device/queryDeviceOrder'

/*车牌 */
//添加车牌
const PLATE_INSERT = 'platenum/insert'
//删除车牌
const PLATE_DELETE = 'platenum/delete'
//查询车牌列表
const PLATE_QUERY_LIST = 'platenum/list'

/*车位操作 */
//查询附近车位
const QUERY_SCOPE_LIST = 'device/queryScopeList'

/*地锁*/
//远程开关锁
const LOCK_DEVICE_GPRS = 'device/lockTheDevice'
//激活地锁
const DEVICE_ACTIVE = 'device/insertDeviceActive'
//完善地锁GPS信息
const UPDATE_GPS = 'device/updateGPS'
//查询用户已绑定的设备
const QUERY_DEVICE = 'device/queryDeviceByUserId'

//查询收费金额
const QUERY_VALID = 'ruleset/queryValid'
//查询锁状态
const QUERY_DEVICE_STATE = 'device/queryDevice'

/*车位出租*/
//立即出租
const DEVICE_SHARE = 'device/shareDevice'
//停止出租
const DEVICE_STOP_SHARE = 'device/stopshareDevice'
//延迟出租
const DEVICE_DELAY_SHARE = 'device/addTimeShareDevice'
/*车位租用*/
const HIRE_DEVICE = 'device/hireDevice'
//停止租用
const STOP_HIRE_DEVICE = 'device/stopHireDeviceOver'
//查询发布历史
const QUERY_SHARE_HISTORY = 'device/queryShareHostorylist'

/*已租信息接口*/
const QUERY_DEVICE_ORDER = 'device/queryDeviceOrder'
/*微信支付 */
//获取openid
const WECHAT_PAY_OPEN_ID = 'wx/login'

class NetRequest {

  //用户登录
  static login(account, password, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "username": account,
        "password": password,
        "userTerminalPo": {
          "deviceCode": "android",
          "imei": "4545546546546",
          "mac": "E0100101010fff",
          "imsi": "aaaaaaaaaaaaaa",
          "ios": "1"
        },
        "pushTerminalPo": {
          "pushUserId": "1234565",
          "pushChannelId": "channel00001",
          "imei": "4545546546546",
          "mac": "E0100101010fff",
          "imsi": "aaaaaaaaaaaaaa",
          "ios": "1",
          "type": 1
        }
      }
    }

    console.log("用户登录 data --> ")
    this.request(USER_LOGIN, data, call)

  }

  //用户注册
  static register(account, password, chptcha, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "username": account,
        "password": password,
        "userTerminalPo": {
          "deviceCode": "android",
          "imei": "4545546546546",
          "mac": "E0100101010fff",
          "imsi": "aaaaaaaaaaaaaa",
          "ios": "0"
        },
        "pushTerminalPo": {
          "pushUserId": "1234565",
          "pushChannelId": "channel00001",
          "imei": "4545546546546",
          "mac": "E0100101010fff",
          "imsi": "aaaaaaaaaaaaaa",
          "ios": "1",
          "type": 1
        },
        "sndChptchaPo": {
          "sendType": 1,
          "phone": account,
          "chptcha": chptcha
        }
      }
    }

    console.log("用户注册 data --> ")
    this.request(USER_REGISTER, data, call)
  }

  static resetPwd(phone, password, salt, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "status": 0,
        "salt": salt,
        "phone": phone,
        "password": password
      }
    }

    console.log("用户找回密码 data --> ")
    this.request(USER_REST_PWD, data, call)
  }

  //sendType视情况而定，手机注册时获取验证码传1，手机登录时获取验证码传2，手机找回密码时获取验证码传3
  static SMSSend(sendType, phone, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "sendType": sendType,
        "phone": phone,
        "code": "+86"
      }
    }

    console.log("请求手机短信验证码 data --> ")
    this.request(SMS_SEND, data, call)
  }

  static queryUserWealth(uesrId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": uesrId
      }
    }

    console.log("查询用户余额 data --> ")
    this.request(USER_WEALTH, data, call)
  }

  static queryNotPayOrder(userId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": userId
      }
    }

    console.log("查询用户当前未支付订单 data --> ")
    this.request(USER_NOT_PAY_ORDER, data, call)
  }

  static queryOrderList(userId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "currentPage": 1,
      "perPageCount": 2,
      "data": {
        "userId": userId
      }
    }

    console.log("查询用户当前已支付的订单 data --> ")
    this.request(USER_ORDER_LIST, data, call)
  }

  static payWithWallet(usersId, orderId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "usersId": usersId,
        "orderId": orderId
      }
    }

    console.log("使用余额支付账单 data --> ")
    this.request(USER_PAY_WITH_WALLET, data, call)
  }

  static queryValid(deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "deviceid": deviceId
      }
    }

    console.log("查询收费金额 data --> ")
    this.request(QUERY_VALID, data, call)
  }

  static queryScopeList(latitude, longitude, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "latitude": latitude,
        "longitude": longitude
      }
    }

    console.log("请求附近的地锁 data --> ")
    this.request(QUERY_SCOPE_LIST, data, call)
  }

  static lockDeviceCloud(userId, command, deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "usersId": userId,
        "command": command,
        "deviceId": deviceId
      }
    }

    console.log("GPRS远程开关锁 data --> ")
    this.request(LOCK_DEVICE_GPRS, data, call)
  }

  static queryDeviceByUserId(userId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "usersId": userId
      }
    }

    console.log("查询用户已绑定的设备 data --> ")
    this.request(QUERY_DEVICE, data, call)
  }

  static insertPlate(userId, platenumHead, platenumTail, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": userId,
        "platenumHead": platenumHead,
        "platenumTail": platenumTail
      }
    }

    console.log("添加车牌号 data --> ")
    this.request(PLATE_INSERT, data, call)
  }
  
  static deletePlate(id, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "id": id
      }
    }

    console.log("删除车牌号 data --> ")
    this.request(PLATE_DELETE, data, call)
  }

  static queryPlateList(id, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": id
      }
    }

    console.log("查询车牌列表 data --> ")
    this.request(PLATE_QUERY_LIST, data, call)
  }

  static shareDevice(userId, deviceId, startTime, endTime, freeset, moneyhour, moneyOverTime, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": userId,
        "deviceId": deviceId,
        "startTime": startTime,
        "endTime": endTime,
        "freeset": freeset,
        "moneyhour": moneyhour,
        "moneyovertime": moneyOverTime
      }
    }

    console.log("立即出租 data --> ")
    this.request(DEVICE_SHARE, data, call)
  }
  
  static stopShareDevice(userId, deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": userId,
        "deviceId": deviceId
      }
    }

    console.log("停止出租 data --> ")
    this.request(DEVICE_STOP_SHARE, data, call)
  }

  static delayShareDevice(userId, deviceId, startTime, endTime, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": userId,
        "deviceId": deviceId,
        "startTime": startTime,
        "endTime": endTime
      }
    }

    console.log("延时出租 data --> ")
    this.request(DEVICE_DELAY_SHARE, data, call)
  }

  static hireDevice(usersId, deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "usersId": usersId,
        "deviceId": deviceId
      }
    }

    console.log("立即租用 data --> ")
    this.request(HIRE_DEVICE, data, call)
  }

  static stopHireDevice(usersId, deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "usersId": usersId,
        "deviceId": deviceId
      }
    }

    console.log("停止租用 data --> ")
    this.request(STOP_HIRE_DEVICE, data, call)
  }

  static queryShareHository(userId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "currentPage": 1,
      "perPageCount": 2,
      "data": {
        "userId": userId
      }
    }

    console.log("查询发布历史  data --> ")
    this.request(QUERY_SHARE_HISTORY, data, call)
  }

  static queryDeviceOrder(userId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": userId
      }
    }

    console.log("查询当前租用状态 data --> ")
    this.request(QUERY_DEVICE_ORDER, data, call)
  }

  static queryDeviceState(deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "deviceId": deviceId
      }
    }

    console.log("查询锁状态 data --> ")
    this.request(QUERY_DEVICE_STATE, data, call)
  }

  static activeDevice(userId, deviceId, param2, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "usersId": userId,
        "deviceId": deviceId,
        "devicePwd": "123456",
        "param2": param2,
        "param3": "2"
      }
    }

    console.log("激活地锁 data --> ")
    this.request(DEVICE_ACTIVE, data, call)
  }

  static updateGPS(userId, deviceId, longitude, latitude, deviceNote, param, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "usersId": userId,
        "deviceId": deviceId,
        "longitude": longitude,
        "latitude": latitude,
        "devicenote": deviceNote,
        "param1": param
      }
    }

    console.log("完善地锁GPS信息 data --> ")
    this.request(UPDATE_GPS, data, call)
  }

  static wechatLogin(code, call) {
    var data = {
      "code": code
    }

    console.log("获取微信支付openId data --> ")
    this.request(WECHAT_PAY_OPEN_ID, data, call)
  }

  static request(url, data, call) {
    console.log(data)
    wx.request({
      url: BASE_URL + url,
      data: data,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data)
        call(res.data)
      },
      fail: function(res) {}
    })
  }
}
module.exports = NetRequest