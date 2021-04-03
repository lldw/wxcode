const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    sealist: {},
  },

  onChange(e) {
    this.setData({
      value: e.detail
    })
  },
  // 搜索功能
  onClick() {
    let that = this;
    let key = this.data.value;

    db.collection('w_lookfor').where(_.or([{
        Item_description: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        address: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      }
    ])).get({
      success: res => {
        that.data.sealist = res.data
        wx.redirectTo({
          url: "../search_content/search_content?list=" + JSON.stringify(that.data.sealist)
        });
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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