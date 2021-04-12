const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    dataList: [],
    lostData: [],
    findData: [],
    objecttArray: [{
        id: 0,
        name: '手机'
      },
      {
        id: 1,
        name: '背包'
      },
      {
        id: 2,
        name: '手表'
      },
      {
        id: 3,
        name: '书'
      },
      {
        id: 4,
        name: '篮球'
      },
    ],
    objectArray: [{
        id: 0,
        name: '失物'
      },
      {
        id: 1,
        name: '招领'
      }
    ],
  },
  // 跳转搜索
  toSearch() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 跳转详情页
  toDetail(e) {
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 轮播图
    db.collection("banner").get().then(res => {
      that.setData({
        banner: res.data
      })
    });

    // 首页数据获取
    db.collection("w_lookfor").where({
      release_type: 1
    }).get().then(res => {
      that.setData({
        findData: res.data
      })
    });
    db.collection("w_lookfor").where({
      release_type: 0
    }).get().then(res => {
      that.setData({
        lostData: res.data
      })
    });

  },

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
      console.log(res.data)
    });
    db.collection("w_lookfor").where({
      item_type: 0
    }).limit(5).orderBy("posttime", "desc").get().then(res => {
      this.setData({
        lostData: res.data
      })
    });
  },

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
  onShareAppMessage: function () {}
})