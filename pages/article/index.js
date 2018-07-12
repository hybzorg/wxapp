// pages/bazi/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    aurl:'',
    hiddenToast: true,
    loadingHidden: true,  // loading
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var self = this;
    if (options.url != null) {
      console.log(options.url);
      var url = getUrl(options.url);
      console.log(url);
      self.setData({
        aurl: url,
      })
    } else {
      self.setData({
        hiddenToast: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
//weixin/getArticle?mid=EgJ52vmdk9xxeIO6Qs-jTVLd2Oe3eOGb5KPYZeIxLGM
function getUrl(aurl) {
  var params = '';
  params = 'url=' + aurl;
  var url = '';
  var action = 'wxapp/com/getArticle?';
  url = getApp().getUrl(action, params);
  //url= 'https://ifate.org/';
  return url;
}