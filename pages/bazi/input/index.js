// pages/bazi/input.js
var CurBazi = require('../../../utils/curBazi.js')
var util = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '男', value: '男', checked: 'true' },
      { name: '女', value: '女' },
    ],
    date: '1988-09-01',
    time: '12:01',
    xing: '',
    ming:'',
    hiddenToast: true,

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
      })
      var curBazi = CurBazi.create();
      curBazi.xing = e.detail.value.xing;
      curBazi.ming = e.detail.value.ming;
      curBazi.sex = e.detail.value.sex;
      
      var times = e.detail.value.time + '';
      curBazi.hour =times.split(":")[0];
      curBazi.minute = times.split(":")[1];
      curBazi.orderno = util.getOrderNo(1);
      curBazi.birthday = e.detail.value.date;
      curBazi.status='0';
      //console.log(JSON.stringify(curBazi));
      wx.setStorage({
        key: "curBazi",
        data: curBazi
      })
     /* wx.getStorage({
        key: 'curBazi',
        success: function (res) {
          console.log(res.data)
        }
      })
    */
      wx.redirectTo({
        url: '../../bazi/index?xing=' + e.detail.value.xing + '&ming=' + e.detail.value.ming + '&sex=' + e.detail.value.sex + '&date=' + e.detail.value.date+ '&time=' + e.detail.value.time,
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