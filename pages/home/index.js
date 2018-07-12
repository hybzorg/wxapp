//获取应用实例
var app = getApp()
Page({
  data: {
    navs: [{ icon: "/images/service_bazi.png", name: "八字算命", typeId: 0 },
    { icon: "/images/service_fate.png", name: "每天运势", typeId: 1 },
    { icon: "/images/service_hehun.png", name: "八字合婚", typeId: 2 },
    { icon: "/images/service_ceming.png", name: "姓名分析", typeId: 3 }],
    slides: [{ "id": 0, "name": "八字算命", "orders": 0, "picurl": "/images/home_ad1.png", "targeturl": "", "distributorid": "all" }, { "id": 1, "name": "每天运势", "orders": 1, "picurl": "/images/home_ad2.png", "targeturl": "", "distributorid": "all" }],

    articles: [{ "Id": 239, "Title": "家居风水禁忌与破解方法", "Url": "" }, { "Id": 239, "Title": "家居风水禁忌与破解方法", "Url": "" }, { "Id": 239, "Title": "家居风水禁忌与破解方法", "Url": "" }],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: true  // loading

  },
  catchTapCategory: function (e) {
    var data = e.currentTarget.dataset
    //app.globalData.currentCateType = { typeName: data.type, typeId: data.typeid }
    console.log(e.currentTarget.dataset.typeid)
    var page = '';
    switch (e.currentTarget.dataset.typeid) {
      case 0:
        page = '../bazi/index';
        break;
     case 1:
        page = '../yunshi/index';
        break;
     case 2:
        page = '../hehun/index';
        break;
      case 3:
        page = '../ceming/index';
        break;
    }
    wx.navigateTo({
      //name:this.data.name,
      url: page,
    })
  },
  //事件处理函数
  swiperchange: function (e) {
    // console.log(e.detail.current)
  },

  onLoad: function () {
   // console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //sliderList
  }
})
