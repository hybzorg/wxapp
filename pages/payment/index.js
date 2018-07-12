// pages/bazi/input.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderNo: '',
    orderName: '八字算命一生详批服务',
    desc: '',
    sum: '60',
    date: '',
    time: '',
    xing: '',
    ming: '',
    sex: '',
    email: '',
    status: '0',
    toastTip: '',
    hiddenToast: true,
    
  },
  onLoad: function (options) {
    var self = this;
    if (options.type==1){
    try {
      var curBazi = wx.getStorageSync('curBazi')
      if (curBazi) {
        self.setData({
          orderNo: curBazi.orderno,
          date: curBazi.birthday,
          time: curBazi.hour + ':' + curBazi.minute,
          xing: curBazi.xing,
          ming: curBazi.ming,
          sex: curBazi.sex,
          status: curBazi.status,
          desc: '姓名：' + curBazi.xing + curBazi.ming + ',性别：' + curBazi.sex + ',生日(公历):' + curBazi.birthday + ' ' + curBazi.hour + ':' + curBazi.minute + '，详细批命',
        })
      }

      if (getApp().globalData.curUser != null) {
        self.setData({
          email: getApp().globalData.curUser.Email,
        })
      }
    } catch (e) {
      // Do something when catch error
    }
    }
  },
  bindEmailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  /* 微信支付 */
  wxpay: function (e) {
    var self = this;
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (!reg.test(self.data.email))
    {
      this.setData({
        toastTip: '邮箱地址错误！',
        hiddenToast: false,
      });
      return;
    }
    self.addOrder();
    //登陆获取code
    wx.login({
      success: function (res) {
        //console.log(res.code)
        self.code = res.code;
        //获取openid
        self.generateOrder(res.code)
      }
    });
  },

  /* 支付   */
  pay: function (param) {
    var self = this;
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        // success
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function (res) {
            var curBazi = wx.getStorageSync('curBazi')
            curBazi.status=1;
            wx.setStorage({
              key: "curBazi",
              data: curBazi
            });
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            });
            var self = this;
          
          },
          fail: function () {
            console.log("------pay fail----------")
            // fail

          },
          complete: function () {
            console.log("------pay complete----------")
            // complete
          }
        })
      },
      fail: function (res) {
        //console.log(res);
        if (res.errMsg == 'requestPayment:fail cancel') {
          self.setData({
            toastTip: '支付取消！',
            hiddenToast: false
          })
        } else {
          self.setData({
            toastTip: '支付失败！',
            hiddenToast: false
          })
        }
        // console.log("------支付 fail ----------");
        // fail
      },
      complete: function () {
        console.log("------支付pay complete----------");
        // complete
      }
    })
  },


  /**
   *    toast显示时间到时处理业务 
   */
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },
})
