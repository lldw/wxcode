const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    indexData: [],
    imgPath:[]
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

  // 首页失物数据
  getData() {
    db.collection("w_lookfor").where({item_type:0}).get().then(res=>{
      this.setData({
        indexData:res.data
      })
      console.log(res)
     });
  },
  // 招领数据
  chanData() {
    db.collection("w_lookfor").where({item_type:1}).get().then(res=>{
      this.setData({
        indexData:res.data
      })
      // console.log(res)
     });
     this.getImg()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //首页数据请求
    wx.request({
      url: 'https://www.fastmock.site/mock/083587c3e4fa3357b03d3357fd64087a/lookup/api/l/getLostItems',
      success: res => {
        res.data.forEach(e => {
          var posttime = e.time * 1000;
          var d = new Date(posttime)
          var year = d.getFullYear();
          var mouth = ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1));
          var day = ((d.getDay()) < 10 ? "0" + (d.getDay()) : (d.getDay()))
          posttime = year + "-" + mouth + "-" + day
          e.time = posttime
        });
        this.setData({
          dataList: res.data
        })
      }
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