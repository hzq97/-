// pages/header/header.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: [
      { key: "tj", name: "推荐", type: "T1348647909107" },
      { key: "sp", name: "杂文", type: "T1350383429665" },
      { key: "rd", name: "热点", type: "T1348649580692" },
      { key: "bd", name: "本地", type: "T1348654105308" },
      { key: "sh", name: "社会", type: "T1348648037603" },
      { key: "yl", name: "娱乐", type: "T1348648517839" },
      { key: "kj", name: "科技", type: "T1348649580692" },
      { key: "qc", name: "汽车", type: "T1348654060988" },
      { key: "ty", name: "体育", type: "T1348649079062" },
      { key: "cj", name: "财经", type: "T1348648756099" },
    ],
    height: 1000,
    list: [

    ],
    active: 'tj',
    page: 0,
    typeID: "T1348647909107"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.clearStorage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var page = this.data.page;
    var start = page * 10;
    var end = (page + 1) * 10;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ height: res.windowHeight - 45 })
      }
    });
    wx.request({
      url: 'http://c.m.163.com/nc/article/headline/T1348647909107/' + start + '-' + end + '.html',
      success: function (res) {
        that.setData({ list: that.data.list.concat(res.data.T1348647909107) })
        wx.setStorage({
          key: "tj",
          data: res.data.T1348647909107
        })
      }
    })

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

  },
  nav: function (e) {
    this.setData({ active: e.target.dataset.key })
    this.setData({ typeID: e.target.dataset.type })
  },
  scroll: function (e) {
    this.setData({ page: this.data.page + 1 });
    var that = this;
    var page = this.data.page; 
    var typeID = this.data.typeID;
    var start = page * 10;
    var end = (page + 1) * 10;
    wx.request({
      url: 'http://c.m.163.com/nc/article/headline/' + typeID + '/' + start + '-' + end + '.html',
      success: function (res) {
        that.setData({ list: that.data.list.concat(res.data[typeID]) })
      }
    })
  },
  change: function (e) {
    this.setData({ list: [] });
    this.setData({ typeID: this.data.title[e.detail.current].type });
    this.setData({ active: e.detail.currentItemId })
    this.setData({ page: 0 });
    var that = this;
    wx.getStorage({
      key: that.data.active,
      success: function (res) {
        that.setData({ list: res.data})
      },
    fail: function () {
      that.setData({page:0})
      var page =  0;
      var typeID = that.data.typeID;
      var active = that.data.active;
      var start = page * 10;
      var end = (page + 1) * 10;
      wx.request({
        url: 'http://c.m.163.com/nc/article/headline/' + typeID + '/' + start + '-' + end + '.html',
        success: function (res) {
          that.setData({ list: res.data[typeID] });
          wx.setStorage({
            key: active,
            data: res.data[typeID]
          })
        }
      })
    }
    })
  }
})