const db = wx.cloud.database()
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
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
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
      console.log(res);
    });

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserProfile({
            desc: "页面展示信息",
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  // wx.request({
                  //     // 自行补上自己的 APPID 和 SECRET
                  //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                  //     success: res => {
                  //         // 获取到用户的 openid
                  //         console.log("用户的openid:" + res.data.openid);
                  //     }
                  // });
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
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
      console.log(res.data)
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