const BASE_URL = 'http://39.108.219.86:8080/tcw/'
//用户
const USER_LOGIN = 'user/login'
const USER_REGISTER = 'user/register'
const USER_REST_PWD = 'user/resetPwd'
//手机短信验证码
const SMS_SEND = 'sendsms/send'

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

/*车位出租*/
//立即出租
const DEVICE_SHARE = 'device/shareDevice'
//停止出租
const DEVICE_STOP_SHARE = 'device/stopshareDevice'
//延迟出租
const DEVICE_DELAY_SHARE = 'device/addTimeShareDevice'
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

  //请求手机短信验证码
  static SMSSend(phone,call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "sendType": 1,
        "phone": phone,
        "code": "+86"
      }
    }

    this.request(SMS_SEND, data, call)
  }

  //请求附近的地锁
  static queryScopeList(latitude, longitude, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "latitude": latitude,
        "longitude": longitude,
        "param2": "2"
      }
    }

    this.request(QUERY_SCOPE_LIST, data, call)
  }

  //添加车牌号
  static insertPlate(platenumHead, platenumTail, call) {
    var data = {
      "statuscode": 0,
      "message": "",
      "data": {
        "userId": 102,
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
        "id": id
      }
    }
    this.request(PLATE_QUERY_LIST, data, call)
  }
  //立即出租
  static shareDevice(userId, deviceId, startTime, endTime, freeset, moneyhour, moneyOverTime, call){
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