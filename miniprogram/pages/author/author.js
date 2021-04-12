const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.openid = app.globalData.openid
  },
  bindGetUserInfo: function (e) {
    wx.getUserProfile({
      desc: '获取用户头像和昵称！',
      success: (res) => {
        const userInfo = res.userInfo
      console.log("授权中",userInfo);
          app.setUserInfo(userInfo)
          wx.showToast({
            title: '授权成功！',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)
        this.onSaveUserInfo(res.userInfo)
      }
    })
  },
  onSaveUserInfo(userInfo) {
    db.collection('user')
      .where({
        _openid: this.openid
      })
      .count()
      .then(res => {
        if (res.total > 0) {
          //doc.update
          db.collection('user').doc(this.openid).update({
            data: userInfo
          }).then(res => {
            console.log(res)
          })
        } else {
          //doc.add
          db.collection('user').add({
            data: userInfo
          }).then(res => {
            console.log(res)
          })
        }
      })
  }
})