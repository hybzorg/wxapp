//app.js
const network = require('./utils/network.js')
App({
  onLaunch: function () {
   // console.log('App Launch')
    //调用API从本地缓存中获取数据
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if (that.globalData.userInfo){
      typeof cb == "function" && cb(that.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {  
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });
          var params = 'code=' + res.code;
     
          }
        }
      })
    }
  },
  onShow: function () {
   // console.log('App Show')
  },
  onHide: function () {
   // console.log('App Hide')
  },
  globalData:{
    curUser:null,
    userInfo:null, 
    curBazi:null,
    //curBazi:'{"xing": "", "ming": "", "sex": "", "birthday": "", "hour": "", "minute": "", "orderno": "", "status": "" }',
    openid:'',
  },

  requestApi(path, params,message, success){
   // console.log(params);
    var url = "https://openapi.fatebox.cn/"+path;
    network.request(url, params, message, {
      'content-type': 'application/json', // 默认值
      'Authorization': "APPCODE 7593766e238740fc81f12e74c68d7b1b",
      //appcode 7593766e238740fc81f12e74c68d7b1b 云市场61530790 6829033 可以从洪铟八字算命阿里云商店上购买API后，即可获取。https://market.aliyun.com/products/57126001/cmapi027257.html
     // 'X-Ca-Stage':'TEST',
       // 
    }, success, function(res){});
  },
 
})