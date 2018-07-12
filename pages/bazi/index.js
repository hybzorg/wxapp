var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    tabs: ['命盘', '命局分析', '流年运程', "付款"],
    loadingHidden: true, // loading
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    zhuxings: [],
    tiangans: [],
    dizhis: [],
    canggans: [],
    fuxings: [],
    xingyuns: [],
    WuXing: '',
    QiangRuo: '',
    GeJu: '',
    YongShen: '',
    XiShen: '',
    JiShen: '',
    CongHe: '',
    Mu: '',
    Jin: '',
    Shui: '',
    Tu: '',
    Huo: '',
    JiaoYunShiJian: '',
    DaYun: [''],
    nDaYun: [''],
    //===========================================
    XingGe: '',
    XueLi: '',
    CaiFuShiYe: '',
    LiuQin: '',
    JiBing: '',
    HunYin: '',
    YiJi: '',
    XiongZai: '',
    GuanSha: '',
    //==================================
    LiuNians: [],
    //=================================
    xing: '',
    ming: '',
    sex: '',
    date: '',
    time: '',
    status: '0',
    action: '',
    toastTip: '',
    hiddenToast: true,
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
    try {
      var curBazi = wx.getStorageSync('curBazi')
      if (curBazi) {
        self.setData({
          date: curBazi.birthday,
          time: curBazi.hour + ':' + curBazi.minute,
          xing: curBazi.xing,
          ming: curBazi.ming,
          sex: curBazi.sex,
          status: curBazi.status,
          //zhuxings: ['1', '2'],
        })
      }
    } catch (e) {
      // Do something when catch error
    }
    if (self.data.xing != '' & self.data.ming != '' & self.data.sex != '' & self.data.date != '' & self.data.time != '') {
      app.requestApi(
        getPath(0),
        {
          birthday: self.data.date,
          hour: self.data.time.split(":")[0],
          minute: self.data.time.split(":")[1],
          //pay: self.data.status,
          pay: '1',
          sex: self.data.sex,
          xing: self.data.xing,
          ming: self.data.ming,
        },
        "test......",
        function (res) {
          var jsonStr = JSON.stringify(res);
          var jsonStrSym = jsonStr.replace('/', '\\');
          var jsonObject = JSON.parse(jsonStrSym);
          var nian = parseInt(jsonObject.JiaoYunShiJian.substr(0, 4));
          var nians = new Array();
          for (var i = 0; i < 9; i++) {
            nians[i] = nian + i;
          }
          self.setData({
            zhuxings: jsonObject.ZhuXing.split(","),
            tiangans: jsonObject.TianGan.split(","),
            dizhis: jsonObject.DiZhi.split(","),
            canggans: jsonObject.CangGan.split(","),
            fuxings: jsonObject.FuXing.split(";"),
            xingyuns: jsonObject.XingYun.split(","),
            WuXing: jsonObject.WuXing,
            QiangRuo: jsonObject.QiangRuo,
            GeJu: jsonObject.GeJu,
            YongShen: jsonObject.YongShen,
            XiShen: jsonObject.XiShen,
            JiShen: jsonObject.JiShen,
            Mu: jsonObject.Mu,
            Jin: jsonObject.Jin,
            Shui: jsonObject.Shui,
            Tu: jsonObject.Tu,
            Huo: jsonObject.Huo,
            CongHe: jsonObject.TianGanHeChong + ' ' + jsonObject.DiZhiHeChong,
            JiaoYunShiJian: jsonObject.JiaoYunShiJian,
            DaYun: jsonObject.DaYun.split(","),
            nDaYun: nians,
            loadingHidden: true
          })
        },function(res){console.log(res);}
      );
    } else {
      self.setData({
        toastTip: '请输入生时信息',
        hiddenToast: false
      })
    }
  },

  openInput: function (e) {
    wx.redirectTo({
      url: '../bazi/input/index',
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
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
      console.log(self.data.activeIndex);
      if (self.data.activeIndex == 3) {
        if (self.data.status == '1') {
          this.setData({
            toastTip: '订单已支付，无需再支付，如有问题，请与客服联系！',
            hiddenToast: false,
            loadingHidden: true,
          });
          return;
        }
        var params = '';
        params = 'type=1'
        var url = '../payment/index?' + params;
        wx.redirectTo({
          url: url,
        })
      } else {
     
        var path = getPath(self.data.activeIndex);
        console.log(path);
        app.requestApi(
          path,
          {
            birthday: self.data.date,
            //birthday: '1976-08-05',
            hour: self.data.time.split(":")[0],
            minute: self.data.time.split(":")[1],
            //pay: self.data.status,
            pay: '1',
            sex: self.data.sex,
            xing: self.data.xing,
            ming: self.data.ming,
          },
          "message",
          function (res) {
            var jsonStr = JSON.stringify(res);
            console.log(jsonStr);
            var jsonStrSym = jsonStr.replace('/', '\\');
            var jsonObject = JSON.parse(jsonStrSym);
            switch (self.data.activeIndex) {
              case '0':
                var nian = parseInt(jsonObject.JiaoYunShiJian.substring(0, 4));
                var nians = new Array();
                for (var i = 0; i < 9; i++) {
                  nians[i] = nian + i;
                }
                self.setData({
                  zhuxings: jsonObject.ZhuXing.split(","),
                  tiangans: jsonObject.TianGan.split(","),
                  dizhis: jsonObject.DiZhi.split(","),
                  canggans: jsonObject.CangGan.split(","),
                  fuxings: jsonObject.FuXing.split(";"),
                  xingyuns: jsonObject.XingYun.split(","),
                  WuXing: jsonObject.WuXing,
                  QiangRuo: jsonObject.QiangRuo,
                  GeJu: jsonObject.GeJu,
                  YongShen: jsonObject.YongShen,
                  XiShen: jsonObject.XiShen,
                  JiShen: jsonObject.JiShen,
                  Mu: jsonObject.Mu,
                  Jin: jsonObject.Jin,
                  Shui: jsonObject.Shui,
                  Tu: jsonObject.Tu,
                  Huo: jsonObject.Huo,
                  CongHe: jsonObject.TianGanHeChong + ' ' + jsonObject.DiZhiHeChong,
                  JiaoYunShiJian: jsonObject.JiaoYunShiJian,
                  DaYun: jsonObject.DaYun.split(","),
                  sDaYun: nians,
                  loadingHidden: true
                })

                break;
              case '1':
                self.setData({
                  XingGe: jsonObject.XingGe,
                  XueLi: jsonObject.XueLi,
                  CaiFuShiYe: jsonObject.CaiFuShiYe.split("\r\n"),
                  LiuQin: jsonObject.LiuQin.split("\r\n"),
                  JiBing: jsonObject.JiBing.split("\r\n"),
                  HunYin: jsonObject.HunYin.split("\r\n"),
                  YiJi: jsonObject.YiJi.split("\r\n"),
                  XiongZai: jsonObject.XiongZai.split("\r\n"),
                  GuanSha: jsonObject.GuanSha.split("\r\n"),
                  loadingHidden: true
                })

                break;
              case '2':
                self.setData({
                  LiuNians: jsonObject,

                })
                break;
            }
          });
      }
    }
  }
});

function getPath(types) {
  var path = 'openapi/bazi/getMingpen';
  if (types == 0) {
    path = 'openapi/bazi/getMingpen';
  } else if (types == 1) {
    path = 'openapi/bazi/getMingju';
  } else if (types == 2) {
    path = 'openapi/bazi/getYunCheng';
  }
  return path;
}