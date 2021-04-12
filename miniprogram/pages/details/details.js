// pages/details/details.js
const db = wx.cloud.database();
const app = getApp()
let Id = ""
let dianzan = false
let shoucang = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    content_list: [],
    shoucangUrl: "../../image/shoucang-no.png",
    dianzanUrl: "../../image/dianzan-no.png",
    pinglunUrl: "../../image/pinglun.png",
  },

  // 收藏
  clickColl() {
    shoucang = !shoucang
    this.setData({
      shoucangUrl: shoucang ? "../../image/shoucang-yes.png" : "../../image/shoucang-no.png"
    })
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "caozuo",
      data: {
        action: "shoucang",
        id: Id,
        dianzan: shoucang
      }
    }).then(res => {
      console.log("收藏更新成功", res);
    }).catch(res => {
      console.log("收藏更新失败", res);
    })
  },
  // 点赞
  click_1() {
    dianzan = !dianzan
    this.setData({
      dianzanUrl: dianzan ? "../../image/dianzan-yes.png" : "../../image/dianzan-no.png"
    })
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "caozuo",
      data: {
        action: "dianzan",
        id: Id,
        dianzan: dianzan
      }
    }).then(res => {
      console.log("点赞更新成功", res);
    }).catch(res => {
      console.log("点赞更新失败", res);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Id = options.id
    let openid = app.globalData.openid
    // 详情页数据
    var that = this;
    db.collection("w_lookfor").where({
      _id: Id
    }).get().then(res => {
      console.log("详情信息获取成功", res.data);
      dianzan = res.data.dianzan,
        shoucang = res.data.shoucang
      that.setData({
        content_list: res.data,
        dianzanUrl: dianzan ? "../../image/dianzan-yes.png" : "../../image/dianzan-no.png",
        shoucangUrl: shoucang ? "../../image/shoucang-yes.png" : "../../image/shoucang-no.png"
      })
    }).catch(err => {
      console.log("详情信息获取失败", err);
    })
    db.collection("user").where({
      _openid: openid
    }).get().then(res => {
      that.setData({
        userInfo: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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