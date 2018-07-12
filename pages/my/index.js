var app = getApp()
Page( {
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [ {
      icon: '../../images/iconfont-dingdan.png',
      text: '修改资料',
      path:'../userinfo/index',
      isunread: false,
      unreadNum: 0
    }
      /*, 
      {
        icon: '../../images/iconfont-dingdan.png',
        text: '问题反馈',
        path: '../userinfo/index',
        isunread: false,
        unreadNum: 0
      },  {
        icon: '../../images/iconfont-kefu.png',
        path: '../userinfo/index',
        text: '联系客服'
      }, {
        icon: '../../images/iconfont-help.png',
        path: '../userinfo/index',
        text: '常见问题'
      }*/
      ]
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  },
  navigateTo(e) {
   // console.log(e);
    var index = e.currentTarget.dataset.index;
    var url='';
    switch (index) {
      case 0:
        url ='../userinfo/index';
        break
      case 1:
        url ='../judgerecord/index';
        break
      case 2:
        //url ='../feedback/index';
        break
      case 3:
        //url ='../userinfo/index';
        break
    }
    wx.navigateTo({
      url: url,
    })
  },
})