// pages/content/content.js

var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  // key:''
  content:'',
  title:'',
  body:'',
  source:'',
  time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "http://c.m.163.com/nc/article/"+options.key+"/full.html",
      success:function(res){
        var rs = res.data[options.key];
        var body = rs.body;
        for (var i = 0; i < rs.img.length; i++) {
          body = body.replace(rs.img[i].ref, '<img  src="' + rs.img[i].src + '"/>');
        }
        WxParse.wxParse('body', 'html', body, that, 5);
        that.setData({ title: rs.title, body: WxParse.wxParse('body', 'html', body, that, 5), source: rs.source,time:rs.ptime})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
  
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