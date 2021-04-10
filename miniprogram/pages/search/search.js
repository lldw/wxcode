const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    sealist: {},
    sercherStorage: []
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
        if (key == null || key == "") {
          wx.showToast({
            title: '搜索条件为空！',
            icon: 'error'
          })
        } else
          wx.redirectTo({
            url: "../search_content/search_content?list=" + JSON.stringify(that.data.sealist)
          });
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 获取历史记录
  getHistory() {
    var that = this;
    wx.getStorage({
      key: 'history',
      success: function (res) {
        that.setData({
          sercherStorage: res.data
        })
        // console.log("缓存", that.data.sercherStorage);
      }
    })
  },
  // 放置历史记录
  setHistory(e) {
    var that = this;
    // console.log(e.currentTarget.dataset.value);
    if (e.currentTarget.dataset.value != "") {
      var arr = that.data.sercherStorage;
      let arrnum = arr.indexOf(e.currentTarget.dataset.value)
      if (arrnum != -1) {
        arr.splice(arrnum, 1)
        arr.unshift(e.currentTarget.dataset.value)
        wx.setStorage({
          data: arr,
          key: 'history',
        })
      } else {
        arr.unshift(e.currentTarget.dataset.value)
        wx.setStorage({
          data: arr,
          key: 'history',
        })
      }
      that.getHistory()
      that.onClick()
    }
  },
  // 删除全部缓存
  de_cache() {
    let that =this;
    that.setData({
      sercherStorage:[]
    })
    wx.removeStorage({
      key: 'history'
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getHistory()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})