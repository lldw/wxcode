// pages/search_content/search_content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getList:[],
    list:[],
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
    },],
    objectArray:[{
      id: 0,
      name: '失物'
    },
    {
      id: 1,
      name: '招领'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    console.log(options.list);
    // that.data.getList = JSON.parse(options.list)
    that.setData({
      getList:(JSON.parse(options.list))
    })
    
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