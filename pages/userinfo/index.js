// pages/bazi/input.js
var CurBazi = require('../../utils/curBazi.js')
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '男', value: '男', checked: 'true' },
      { name: '女', value: '女', checked: 'false' },
    ],
    date: '1988-09-01',
    time: '12:01',
    xing: '',
    ming: '',
    sex: '男',
    hiddenToast: true,
    loadingHidden: true,
  },

  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  xingInputEvent: function (e) {
    this.setData({
      xing: e.detail.value,
    })
  },
  mingInputEvent: function (e) {
    this.setData({
      ming: e.detail.value,
    })
  },

  formBindsubmit: function (e) {
    var self = this;
    if (e.detail.value.xing.length == 0 || e.detail.value.ming.length == 0) {
      self.setData({
        hiddenToast: false,
      })
    } else {
      self.setData({
        loadingHidden: false,
      })
      //console.log(getApp().globalData.userInfo);
      var xing = e.detail.value.xing;
      var ming = e.detail.value.ming;
      var sex = e.detail.value.sex;
      var username = getApp().globalData.userInfo.nickName;
      var wechat = '';
      if (getApp().globalData.curUser != null) {
        wechat = getApp().globalData.curUser.Wechat;
      } else {
        wechat = getApp().globalData.openid;
      }
      var times = e.detail.value.time + '';
      var hour = times.split(":")[0];
      var minute = times.split(":")[1];
      var birthday = e.detail.value.date;
      var email = e.detail.value.email;
      self.updateUser(username, xing, ming, sex, birthday, hour, minute, wechat, email);

    }

  },
  //创建订单
  updateUser: function (Username, Xing, Ming, Sex, Birthday, Hour, Minute, Wechat, Email) {
    var self = this;
    var curUser = CurBazi.createCurUser();
    curUser.Xing = Xing;
    curUser.Ming = Ming;
    curUser.Sex = Sex;

    curUser.Birthday = Birthday;
    curUser.Hour = Hour;
    curUser.Minute = Minute;
    curUser.Status = '0';
    curUser.Email = Email;
    getApp().globalData.curUser = curUser;
    self.setData({
      loadingHidden: true,
    });
    wx.switchTab({
              url: '../my/index',
            });
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var self = this;
    if (getApp().globalData.curUser != null) {
      self.setData({
        date: getApp().globalData.curUser.Birthday,
        time: getApp().globalData.curUser.Hour + ":" + getApp().globalData.curUser.Minute,
        xing: getApp().globalData.curUser.Xing,
        ming: getApp().globalData.curUser.Ming,
        sex: getApp().globalData.curUser.Sex,
        email: getApp().globalData.curUser.Email,
      })
    }
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

