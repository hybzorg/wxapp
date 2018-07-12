// pages/bazi/input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    time: '12:01',
    fdate: '2016-09-01',
    ftime: '12:01',
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

  bindFDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      fdate: e.detail.value
    })
  },

  bindFTimeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ftime: e.detail.value
    })
  },
  
  formBindsubmit: function (e) {
    var self=this;
    if (e.detail.value.xing.length == 0 || e.detail.value.ming.length == 0) {
      self.setData({
        hiddenToast: false,
      })
    } else {
      self.setData({
        //xing: e.detail.value.xing,
        // ming: e.detail.value.ming
      })
      wx.redirectTo({
        //name:this.data.name,
        url: '../../hehun/index?xing=' + e.detail.value.xing + '&ming=' + e.detail.value.ming + '&date=' + e.detail.value.date + '&time=' + e.detail.value.time + '&fxing='+ e.detail.value.fxing + '&fming=' + e.detail.value.fming + '&fdate=' + e.detail.value.fdate + '&ftime=' + e.detail.value.ftime,
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