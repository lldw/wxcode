var util = require('../../util/time');

const db = wx.cloud.database();
var urlArr = [];
var filePath = [];
var img_path = "";
var idx =0;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    placeholder: "可以描述—下物品样式、丢失地点等信息增加找回的几率。",
    array: ['失物', '招领'],
    objectArray: [{
        id: 0,
        name: '失物'
      },
      {
        id: 1,
        name: '招领'
      }
    ],
    tArray: ['手机', '背包', '手表', '书', '篮球'],
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
    index: 0,
    idx: 0,
    imgs: [],
    count: 3,
    date: util.formatTime(new Date())
  },


  upFile() {
    wx.chooseImage({
      count: 1,
      success: res => {
        filePath = res.tempFilePaths
        filePath.forEach((item, idx) => {
          var fileName = Date.now() + "_" + idx;
          this.cloudFile(fileName, item)
        })
      },
    })

  },
  cloudFile(filename, path) {
    wx.showLoading({
      title: '图片上传中...',
      mask: true
    })
    wx.cloud.uploadFile({
      cloudPath: filename + ".jpg",
      filePath: path
    }).then(res => {
      urlArr.push(res.fileID)
      if (filePath.length == urlArr.length) {
        this.setData({
          urlArr
        })
        console.log(urlArr)
      }
      // if (flag == 1) {
      img_path = res.fileID
      wx.hideLoading()
    })

  },
  subBtn(res) {
    var {
      //物品描述
      ItemDescription,   
      // 联系人
      contacts,
      // 物品类型
      itemType,
      // 丢失地点
      location,
      // 丢失时间
      posttime,
      // 发布类型
      releaseType,
    } = res.detail.value;
    // 如果物品描述 、丢失地点、联系人 不为空可以保存跳转
    if (ItemDescription && contacts  && location ) {
      db.collection('w_lookfor').add({
        data: {
          Item_description: ItemDescription,
          contacts: contacts,
          item_type: itemType,
          location: location,
          posttime: posttime,
          release_type: releaseType,
          img: img_path,
          // time:util.formatTime(new Date())
        }
      }).then(res => {
        // flag = 1;
        console.log(res)
      })
      this.toIndex()
    }else{
      console.log(res)
      wx.showToast({
        title: '所有信息为必输项',
        icon:'error'
      })
    }
  },


  // 上传前校验
  beforeRead(event) {
    const {
      file,
      callback
    } = event.detail;
    callback(file.type === 'image');
  },


  // 发布类型选择
  bindPickerChange: function (e) {
    this.setData({
      idx: Number(e.detail.value),
    })
  },
  bindPickerChanges: function (e) {
    console.log(e);
    this.setData({
      index: Number(e.detail.value)
    })
  },
  bindDateChange: function (e) {
    console.log(e);
    this.setData({
      date: e.detail.value
    })
  },

  // 提交按钮点击
  toIndex() {
    wx.showToast({
      title: '发布信息成功！',
    })
    wx.switchTab({
      url: "../index/index",
    });
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