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

/*已租信息接口*/
const QUERY_DEVICE_ORDER = 'device/queryDeviceOrder'
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

    this.request(USER_REGISTER, data, call)
  }

  //用户找回密码
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

    this.request(USER_REST_PWD, data, call)
  }

  //请求手机短信验证码 sendType视情况而定，手机注册时获取验证码传1，手机登录时获取验证码传2，手机找回密码时获取验证码传3
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

    this.request(SMS_SEND, data, call)
  }

  //查询用户余额
  static queryUserWealth(uesrId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": uesrId
      }
    }

    this.request(USER_WEALTH, data, call)
  }

  //查询用户当前未支付订单
  static queryNotPayOrder(userId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": userId
      }
    }

    console.log(data)
    this.request(USER_NOT_PAY_ORDER, data, call)
  }

  //查询用户当前已支付的订单
  static queryOrderList(userId, call){
    var data = {
      "statuscode": 0,
      "message": "",
      "currentPage": 1,
      "perPageCount": 2,
      "data": {
        "userId": userId
      }
    }


    console.log(data)
    this.request(USER_ORDER_LIST, data, call)
  }

  //使用余额支付账单
  static payWithWallet(usersId, orderId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "usersId": usersId,
        "orderId": orderId
      }
    }
    this.request(USER_PAY_WITH_WALLET, data, call)
  }
  //查询收费金额
  static queryValid(deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "deviceid": deviceId
      }
    }

    this.request(QUERY_VALID, data, call)
  }

  //请求附近的地锁
  static queryScopeList(latitude, longitude, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "latitude": latitude,
        "longitude": longitude
      }
    }

    this.request(QUERY_SCOPE_LIST, data, call)
  }

  //GPRS远程开关锁
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

    this.request(LOCK_DEVICE_GPRS, data, call)
  }
  //添加车牌号
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

    this.request(PLATE_INSERT, data, call)
  }
  //删除车牌号
  static deletePlate(id, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "id": id
      }
    }
    this.request(PLATE_DELETE, data, call)
  }
  //查询车牌列表
  static queryPlateList(id, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": id
      }
    }
    this.request(PLATE_QUERY_LIST, data, call)
  }
  //立即出租
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
    this.request(DEVICE_SHARE, data, call)
  }
  //停止出租
  static stopShareDevice(userId, deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": userId,
        "deviceId": deviceId
      }
    }

    this.request(DEVICE_STOP_SHARE, data, call)
  }
  //延时出租
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
    this.request(DEVICE_DELAY_SHARE, data, call)
  }

  //立即租用
  static hireDevice(usersId, deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "usersId": usersId,
        "deviceId": deviceId
      }
    }
    this.request(HIRE_DEVICE, data, call)
  }

  //停止租用
  static stopHireDevice(usersId, deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "usersId": usersId,
        "deviceId": deviceId
      }
    }
    this.request(STOP_HIRE_DEVICE, data, call)
  }

  //查询当前租用状态
  static queryDeviceOrder(userId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": userId
      }
    }

    this.request(QUERY_DEVICE_ORDER, data, call)
  }

  //查询锁状态
  static queryDeviceState(deviceId, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "deviceId": deviceId
      }
    }

    this.request(QUERY_DEVICE_STATE, data, call)
  }
  //激活地锁
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
    this.request(DEVICE_ACTIVE, data, call)
  }

  //完善地锁GPS信息
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
    this.request(UPDATE_GPS, data, call)
  }

  static request(url, data, call) {
    wx.request({
      url: BASE_URL + url,
      data: data,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        call(res.data)
      },
      fail: function(res) {}
    })
  }
}
module.exports = NetRequest