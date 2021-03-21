const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    lostData: [],
    findData: []
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    Toast('搜索' + this.data.value);
  },
  onClick() {
    Toast('搜索' + this.data.value);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("w_lookfor").where({
      item_type: 0
    }).limit(5).get().then(res => {
      this.setData({
        lostData: res.data
      })
      console.log(res)
    });
    db.collection("w_lookfor").where({
      item_type: 1
    }).limit(5).get().then(res => {
      this.setData({
        findData: res.data
      })
      console.log(res)
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
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
  onPullDownRefresh: function () {
    db.collection("w_lookfor").where({
      item_type: 1
    }).limit(5).orderBy("posttime", "desc").get().then(res => {
      this.setData({
        findData: res.data
      })
      console.log(res)
    });
    db.collection("w_lookfor").where({
      item_type: 0
    }).limit(5).orderBy("posttime", "desc").get().then(res => {
      this.setData({
        lostData: res.data
      })
      console.log(res)
    });
  },
  // 下拉数据刷新
  // loadRead(num, page) {
  //   wx.cloud.callFunction({
  //     name: "loadRead",
  //     data: {
  //       num: num,
  //       page: page
  //     }
  //   }).then(res => {
  //     var oldData = this.data.lostData
  //     var newData = oldData.concat(res.result.data)
  //     this.setData({
  //       lostData: newData
  //     })
  //   })
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // var page = this.data.lostData.length
    // this.loadRead(5, page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})