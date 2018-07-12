var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
var wxCharts = require('../../utils/wxcharts.js');
import { $wuxRater } from '../../components/wux';

var lineChart = null;
Page({
  data: {
    tabs: ['本日运气', '本周运气', '本月运气', "本年运气"],
    loadingHidden: true,  // loading
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //==============================
    prev: '前一天',
    next: '后一天',
    //==============================
    birthday: '',
    xing: '',
    ming: '',
    sex: '',
    date: '',
    time: '',
    status: '0',
    action: '',
    toastTip: '',
    hiddenToast: true,
    //============weekyun==========================
    categories: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    CaiYun: [],
    YinYuanYun: [],
    ShiYeYun: [],
    WeekDay: '',
    WeekTotalScore: '',
    //=============dayun==========================
    GongLi: '',
    NongLi: '',
    GanZhi: '',
    ShiXiang: '',
    XinXingShiXiang: '',
    TotalScore: '',
    //=============month=====================================
    grids: [],
    MonthDate: '',
    MonthDesc: '',
    MonthTotalScore: '',
    MonthXinXingShiXiang: '',
    MonthShiXiang: '',
    //========year================================
    NianYun: [],
    YearDate: '',
    YearDesc: '',
    YearTotalScore: '',
    YearXinXingShiXiang: '',
    YearShiXiang: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
      var curBazi = wx.getStorageSync('curBazi');
      var myDate = new Date();
      console.log(myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate());
      if (curBazi) {
        self.setData({
          birthday: curBazi.birthday,
          //  birthday: '2018-11-11',
          date: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate(),
          time: curBazi.hour + ':' + curBazi.minute,
          xing: curBazi.xing,
          ming: curBazi.ming,
          sex: curBazi.sex,
          status: curBazi.status,
        })
      }
    } catch (e) {
      // Do something when catch error
    }
    if (self.data.xing != '' & self.data.ming != '' & self.data.sex != '' & self.data.date != '' & self.data.time != '') {
      app.requestApi(
        getPath(0),
        {
          date: self.data.date,
          birthday: self.data.birthday,
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
          console.log(res);
          var jsonStr = JSON.stringify(res);
          var jsonStrSym = jsonStr.replace('/', '\\');
          var jsonObject = JSON.parse(jsonStrSym);
          // console.log(self.data.activeIndex);
          //console.log(jsonObject);
          $wuxRater.init('caiyun', {
            value: jsonObject.CaiYun / 2,
            disabled: !0,
          })

          $wuxRater.init('shiyeyun', {
            value: jsonObject.ShiYeYun / 2,
            disabled: !0,
          })

          $wuxRater.init('yinyuanyun', {
            value: jsonObject.YinYuanYun / 2,
            disabled: !0,
          })
          self.setData({
            GongLi: jsonObject.GongLi,
            NongLi: jsonObject.NongLi,
            GanZhi: jsonObject.GanZhi,
            ShiXiang: jsonObject.ShiXiang,
            XinXingShiXiang: jsonObject.XinXingShiXiang,
            TotalScore: jsonObject.TotalScore,
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
  openInput: function (e) {
    wx.redirectTo({
      url: '../bazi/input/index',
    })
  },

  // 新的绑定导航切换样式方法
  tabClick: function (options) {
    var self = this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
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
      });
     
        var path = getPath(self.data.activeIndex);
        app.requestApi(
          path,
          {
            birthday: self.data.birthday,
            hour: self.data.time.split(":")[0],
            minute: self.data.time.split(":")[1],
            //pay: self.data.status,
            pay: '1',
            sex: self.data.sex,
            xing: self.data.xing,
            ming: self.data.ming,
            date: self.data.date,
          },
          "message",
          function (res) {

            var jsonStr = JSON.stringify(res);
            var jsonStrSym = jsonStr.replace('/', '\\');
            var jsonObject = JSON.parse(jsonStrSym);
            // console.log(self.data.activeIndex);
            switch (self.data.activeIndex) {
              case '0':
                //console.log(jsonObject);
                $wuxRater.init('caiyun', {
                  value: jsonObject.CaiYun / 2,
                  disabled: !0,
                })

                $wuxRater.init('shiyeyun', {
                  value: jsonObject.ShiYeYun / 2,
                  disabled: !0,
                })

                $wuxRater.init('yinyuanyun', {
                  value: jsonObject.YinYuanYun / 2,
                  disabled: !0,
                })
                self.setData({
                  prev: '前一天',
                  next: '后一天',
                  GongLi: jsonObject.GongLi,
                  NongLi: jsonObject.NongLi,
                  GanZhi: jsonObject.GanZhi,
                  ShiXiang: jsonObject.ShiXiang,
                  XinXingShiXiang: jsonObject.XinXingShiXiang,
                  TotalScore: jsonObject.TotalScore,
                  loadingHidden: true
                })

                break;
              case '1':
                // console.log(jsonObject.CaiYun);
                self.setData({
                  prev: '前一周',
                  next: '后一周',
                  WeekDay: jsonObject.WeekDay,
                  WeekTotalScore: jsonObject.TotalScore,
                  CaiYun: jsonObject.CaiYun,
                  ShiYeYun: jsonObject.ShiYeYun,
                  YinYuanYun: jsonObject.YinYuanYun,
                });
                lineChart = new wxCharts({
                  canvasId: 'lineCanvas',
                  type: 'line',
                  categories: self.data.categories,
                  animation: true,
                  legend: true,
                  // background: '#f5f5f5',
                  series: [{
                    name: '财运',
                    color: 'red',
                    data: self.data.CaiYun,
                  }, {
                    name: '姻缘运',
                    color: 'green',
                    data: self.data.YinYuanYun,
                  }, {
                    name: '事业运',
                    color: 'yellow',
                    data: self.data.YinYuanYun,
                  }],
                  xAxis: {
                    disableGrid: true
                  },
                  yAxis: {
                    title: '运气分数',
                    min: 0,
                    max: 10
                  },
                  width: windowWidth,
                  height: 200,
                  dataLabel: true,
                  dataPointShape: true,
                  extra: {
                    lineStyle: 'curve'
                  }
                });
                //=============================
                $wuxRater.init('zhoucaiyun', {
                  value: jsonObject.TotalCaiYun / 2,
                  disabled: !0,
                })

                $wuxRater.init('zhoushiyeyun', {
                  value: jsonObject.TotalShiYeYun / 2,
                  disabled: !0,
                })

                $wuxRater.init('zhouyinyuanyun', {
                  value: jsonObject.TotalYinYuanYun / 2,
                  disabled: !0,
                })
                self.setData({

                  loadingHidden: true
                })

                break;
              case '2':
                var jsStr = getMonthData(jsonObject.Yun, jsonObject.WeekdayOffset);
                var jsStrSym = jsStr.replace('/', '\\');
                var datas = JSON.parse(jsStrSym);
                self.setData({
                  prev: '前一月',
                  next: '后一月',
                  grids: datas,
                  MonthDate: jsonObject.Date,
                  MonthDesc: jsonObject.Desc,
                  MonthTotalScore: jsonObject.TotalScore,
                  MonthXinXingShiXiang: jsonObject.XinXingShiXiang,
                  MonthShiXiang: jsonObject.ShiXiang,
                });
                //=============================
                $wuxRater.init('yuecaiyun', {
                  value: jsonObject.TotalCaiYun / 2,
                  disabled: !0,
                })

                $wuxRater.init('yueshiyeyun', {
                  value: jsonObject.TotalShiYeYun / 2,
                  disabled: !0,
                })

                $wuxRater.init('yueyinyuanyun', {
                  value: jsonObject.TotalYinYuanYun / 2,
                  disabled: !0,
                })
                break;
              case '3':
                // console.log(jsonObject.CaiYun);
                self.setData({
                  prev: '前一年',
                  next: '后一年',
                  NianYun: jsonObject.Yun,
                  YearDate: jsonObject.Date,
                  YearDesc: jsonObject.Desc,
                  YearTotalScore: jsonObject.TotalScore,
                  YearXinXingShiXiang: jsonObject.XinXingShiXiang,
                  YearShiXiang: jsonObject.ShiXiang,
                });
                lineChart = new wxCharts({
                  canvasId: 'yearCanvas',
                  type: 'line',
                  categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                  animation: true,
                  legend: true,
                  // background: '#f5f5f5',
                  series: [{
                    name: '财运',
                    color: 'red',
                    data: self.data.NianYun,
                  }],
                  xAxis: {
                    disableGrid: true
                  },
                  yAxis: {
                    title: '运气分数',
                    min: 0,
                    max: 10
                  },
                  width: windowWidth,
                  height: 200,
                  dataLabel: true,
                  dataPointShape: true,
                  extra: {
                    lineStyle: 'curve'
                  }
                });
                //=============================
                $wuxRater.init('niancaiyun', {
                  value: jsonObject.TotalCaiYun / 2,
                  disabled: !0,
                })

                $wuxRater.init('nianshiyeyun', {
                  value: jsonObject.TotalShiYeYun / 2,
                  disabled: !0,
                })

                $wuxRater.init('nianyinyuanyun', {
                  value: jsonObject.TotalYinYuanYun / 2,
                  disabled: !0,
                })
            }
          });
      
    }
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
function getMonthData(datas, offset) {
  var v = "{\"value\":";
  var c = "\"color\":";
  var quots = "\"";
  var str = "";
  // console.log(datas.length);
  for (var i = 0; i < offset; i++) {
    if (str.length > 0) {
      str += ","
    }
    str += v + quots + quots + "," + c + "\"#ffffff\"}";
  }
  var n = 0;
  for (var i = 0; i < datas.length; i++) {
    if (str.length > 0) {
      str += ","
    }
    n = i + 1;
    // str += v + quots + datas[i] + quots + "," + c + quots + getColor(datas[i]) + quots + "}";
    str += v + quots + n + quots + "," + c + quots + getColor(datas[i]) + quots + "}";
  }
  var pads = 0;
  var count = datas.length + offset;
  if (count > 28 & count <= 35) {
    pads = 35 - count;
  } else if (count > 35) {
    pads = 42 - count;
  }
  for (var i = 0; i < pads; i++) {
    str += ","
    str += v + quots + quots + "," + c + quots + "#ffffff" + quots + "}";
  }
  str = "[" + str + "]";
  return str;
}
function getColor(n) {
  var c = "#000000";
  if (n < 2) {
    c = "#000000";
  } else if (n >= 2 & n < 4) {
    c = "##808080";
  } else if (n >= 4 & n < 6) {
    c = "#008000";
  } else if (n >= 6 & n < 8) {
    c = "#FFFF00";
  } else if (n = 8) {
    c = "#FFA500";
  } else if (n > 8) {
    c = "#FF0000";
  }
  return c;
}
function getPath(types) {
  var path = 'openapi/yunshi/getDayYun';
  if (types == 0) {
    path = 'openapi/yunshi/getDayYun';
  } else if (types == 1) {
    path = 'openapi/yunshi/getweekYun';
  } else if (types == 2) {
    path = 'openapi/yunshi/getmonthYun	';
  } else if (types == 3) {
    path = 'openapi/yunshi/getyearYun	';
  }
  return path;
}
