var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    tabs: ['男方命盘', '女方命盘', '合婚分析'],
    loadingHidden: true, // loading
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    loadingHidden: true,  // loading
    //Inx: 0,
    xing: '',
    ming: '',
    sex: '男',
    date: '',
    time: '',
    //==========================================
    mxing: '',
    mming: '',
    msex: '男',
    mdate: '',
    mtime: '',
    fxing: '',
    fming: '',
    fsex: '女',
    fdate: '',
    ftime: '',
    action: '',
    //==========================================
    zhuxings: [],
    tiangans: [],
    dizhis: [],
    canggans: [],
    fuxings: [],
    xingyuns: [],
    daYuns: [],
    suis: [],
    nians: [],
    jianpi: '',
    huyin: '',
    hehuns: [],
    hiddenToast: true,
  },
  openInput: function (e) {
    wx.redirectTo({
      url: '../hehun/input/index',
    })
  },

  isShowToast: function () {
    this.setData({
      isHiddenToast: false
    })
  },
  toastChange: function () {
    this.setData({
      isHiddenToast: true
    })
  },
  onLoad: function (options) {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          sliderLeft: (res.windowWidth / self.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / self.data.tabs.length * self.data.activeIndex
        });
      }
    });
    if (options.xing != null & options.ming != null & options.date != null & options.time != null) {
      self.setData({
        mxing: options.xing,
        mming: options.ming,
        msex: '男',
        mdate: options.date,
        mtime: options.time,
        fxing: options.fxing,
        fming: options.fming,
        fsex: '女',
        fdate: options.fdate,
        ftime: options.ftime,
      })
    }
    if (self.data.mxing != '' & self.data.mming != '' & self.data.msex != '' & self.data.mdate != '' & self.data.mtime != '') {
      app.requestApi(
        getPath(0),
        getParams(self.data.mxing, self.data.mming, self.data.msex, self.data.mdate, self.data.mtime, 0),
        "test......",
        function (res) {
          console.log(res);
          var jsonStr = res;
          var jsonStrSym = jsonStr.replace(/\n/g, "").replace(/\r/g, "");
          var jsonObject = JSON.parse(jsonStrSym);
          self.setData({
            zhuxings: jsonObject.MingPen.ZhuXing.split(","),
            tiangans: jsonObject.MingPen.TianGan.split(","),
            dizhis: jsonObject.MingPen.DiZhi.split(","),
            canggans: jsonObject.MingPen.CangGan.split(","),
            fuxings: jsonObject.MingPen.FuXing.split(";"),
            xingyuns: jsonObject.MingPen.XingYun.split(","),
            daYuns: jsonObject.DaYuns.tiangan.split(","),
            suis: jsonObject.DaYuns.sui.split(","),
            nians: jsonObject.DaYuns.nian.split(","),
            huyin: jsonObject.Huyin.split(","),
            jianpi: jsonObject.JianPi.split(","),        
            //====================================
            xing: self.data.mxing,
            ming: self.data.mming,
            sex: '男',
            date: self.data.mdate,
            time: self.data.mtime,
            loadingHidden: true
          })
        }
      );
    } else {
      self.setData({
        toastTip: '请输入生时信息',
        hiddenToast: false
      })
    }
  },

  tabClick: function (options) {
    var self = this;
    self.setData({
      sliderOffset: options.currentTarget.offsetLeft,
      activeIndex: options.currentTarget.id
    });

    if (self.data.xing == '' || self.data.xing == null) {
      self.setData({
        hiddenToast: !self.data.hiddenToast,
        activeIndex: options.currentTarget.id
      })
    } else {
      self.setData({
        activeIndex: options.currentTarget.id,
        loadingHidden: false
      })

      var path = getPath(self.data.activeIndex);
      app.requestApi(
        path,
        getParams(self.data.mxing, self.data.mming, self.data.msex, self.data.mdate, self.data.mtime, self.data.fxing, self.data.fming, self.data.fsex, self.data.fdate, self.data.ftime, self.data.activeIndex),
        "message",
        function (res) {
          console.log(res);
          switch (self.data.activeIndex) {
            case '0':
              var jsonStr = res;
              var jsonStrSym = jsonStr.replace(/\n/g, "").replace(/\r/g, "");
              var jsonObject = JSON.parse(jsonStrSym);
              self.setData({
                zhuxings: jsonObject.MingPen.ZhuXing.split(","),
                tiangans: jsonObject.MingPen.TianGan.split(","),
                dizhis: jsonObject.MingPen.DiZhi.split(","),
                canggans: jsonObject.MingPen.CangGan.split(","),
                fuxings: jsonObject.MingPen.FuXing.split(";"),
                xingyuns: jsonObject.MingPen.XingYun.split(","),
                daYuns: jsonObject.DaYuns.tiangan.split(","),
                suis: jsonObject.DaYuns.sui.split(","),
                nians: jsonObject.DaYuns.nian.split(","),
                huyin: jsonObject.Huyin.split(","),
                jianpi: jsonObject.JianPi.split(","),
                //====================================
                xing: self.data.mxing,
                ming: self.data.mming,
                sex: '男',
                date: self.data.mdate,
                time: self.data.mtime,

                loadingHidden: true
              })

              break;
            case '1':
              var jsonStr = res;
              var jsonStrSym = jsonStr.replace(/\n/g, "").replace(/\r/g, "");
              var jsonObject = JSON.parse(jsonStrSym);
              self.setData({
                zhuxings: jsonObject.MingPen.ZhuXing.split(","),
                tiangans: jsonObject.MingPen.TianGan.split(","),
                dizhis: jsonObject.MingPen.DiZhi.split(","),
                canggans: jsonObject.MingPen.CangGan.split(","),
                fuxings: jsonObject.MingPen.FuXing.split(";"),
                xingyuns: jsonObject.MingPen.XingYun.split(","),
                daYuns: jsonObject.DaYuns.tiangan.split(","),
                suis: jsonObject.DaYuns.sui.split(","),
                nians: jsonObject.DaYuns.nian.split(","),
                huyin: jsonObject.Huyin.split(","),
                jianpi: jsonObject.JianPi.split(","),
                //====================================
                xing: self.data.fxing,
                ming: self.data.fming,
                sex: '女',
                date: self.data.fdate,
                time: self.data.ftime,
                loadingHidden: true,
              })

              break;
            case '2':
              var jsonStr = JSON.stringify(res);
              //var jsonStrSym = jsonStr.replace(/\n/g, "").replace(/\r/g, "");
              var jsonObject = JSON.parse(jsonStr);
              self.setData({
               // hehuns: jsonStr.split(",").replace(''),
                hehuns: jsonObject,
                loadingHidden: true,
              })
              break;
          }
        });

    }
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
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

function getParams(xing, ming, sex, date, time, fxing, fming, fsex, fdate, ftime, types) {
  var params = {
    birthday: date,
    hour: time.split(":")[0],
    minute: time.split(":")[1],
    sex: '男',
    xing: xing,
    ming: ming,
  };
  if (types == 0) {
    params = {
      birthday: date,
      hour: time.split(":")[0],
      minute: time.split(":")[1],
      sex: '男',
      xing: xing,
      ming: ming,
    };
  } else if (types == 1) {
    params = {
      birthday: fdate,
      hour: ftime.split(":")[0],
      minute: ftime.split(":")[1],
      sex: '女',
      xing: fxing,
      ming: fming,
    };
  } else if (types == 2) {
    params = {
      malebirthday: date,
      malehour: time.split(":")[0],
      maleminute: time.split(":")[1],
      malexing: xing,
      maleming: ming,

      femalebirthday: fdate,
      femalehour: ftime.split(":")[0],
      femaleminute: ftime.split(":")[1],
      femalexing: fxing,
      femaleming: fming,
    };
  }
  return params;
}
function getPath(types) {
  var path = 'openapi/hehun/getMingPen';
  if (types == 0) {
    path = 'openapi/hehun/getMingPen';
  } else if (types == 1) {
    path = 'openapi/hehun/getMingPen';
  } else if (types == 2) {
    path = 'openapi/hehun/gethehun';
  }
  return path;
}