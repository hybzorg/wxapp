var network = require('../../utils/network.js')
const app = getApp();

Page({
  data: {
    //=================================
    xing: '',
    ming: '',
    sex: '',
    date: '',
    time: '',
    status: '0',
    action: '',
    toastTip: '',
    //================================
    Xings: [],
    Mings: [],
    ShengYun: '',
    TianGe: [],
    RenGe: [],
    DiGe: [],
    WaiGe: [],
    ZongGe: [],
    PingFen:'',
    JiChuYun: [],
    ChengGongYun: [],
    SheJiaoYun: [],

    hiddenToast: true,
    loadingHidden: true,  // loading
  },
  openInput: function (e) {
    wx.redirectTo({
      url: '../ceming/input/index',
    })
  },
  onLoad: function (options) {
    var self = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     self.setData({
    //       sliderLeft: (res.windowWidth / self.data.tabs.length - sliderWidth) / 2,
    //       sliderOffset: res.windowWidth / self.data.tabs.length * self.data.activeIndex
    //     });
    //   }
    // });
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
        'openapi/Name/getName',
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
          //var jsonStrSym = jsonStr.replace('/', '\\');
          var jsonObject = JSON.parse(jsonStr);
          var xing = jsonObject.Xings.split("|");
          //console.log(xing);
          var xings = [];
          for (var i = 0; i < xing.length; i++) {
            xings.push(xing[i].split("/"));
          }
          var ming = jsonObject.Mings.split("|");
          var mings=[];
          for (var i=0;i<ming.length;i++){
            mings.push(ming[i].split("/"));
          }
          self.setData({
            Xings: xings,
            Mings: mings,
            ShengYun: jsonObject.ShengYun,
            TianGe: jsonObject.TianGe.split("|"),
            RenGe: jsonObject.RenGe.split("|"),
            DiGe: jsonObject.DiGe.split("|"),
            WaiGe: jsonObject.DiGe.split("|"),
            ZongGe: jsonObject.ZongGe.split("|"),
            JiChuYun: jsonObject.JiChuYun.split("|"),
            ChengGongYun: jsonObject.ChengGongYun.split("|"),
            SheJiaoYun: jsonObject.SheJiaoYun.split("|"),
            PingFen: jsonObject.PingFen,

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
