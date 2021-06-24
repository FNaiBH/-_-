// pages/movement/movement.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: {},
    //  buxing:['慢速（3km/h','中速','快速','很快','下楼','上楼','上下楼'],
    start: 25,
    movementData: {},
    movementList: {},
    typeIndex: 0,
    types: ['家务', '步行', '跑步', '骑行', '球类', '跳绳', '舞蹈', '游泳', '其他活动'],
    movementType: '家务'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var array = []
    for (var i = 5; i < 301; i++) {
      array.push(i);
    }
    this.setData({
      array: array,
      movementData: app.globalData.movementData,
      movementList: app.globalData.movementList
    })
  },

  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value,
      movementType: this.data.types[e.detail.value]
    })
  },

  bindPickerChange: function (e) {
    var id = e.currentTarget.id
    var movementData = this.data.movementData
    var movementList = this.data.movementList
    movementData[id][2] = 5 + parseInt(e.detail.value)
    if (movementList[id]) {
      movementList[id][2] = movementData[id][2]
    } else {
      movementList[id] = movementData[id]
    }
    this.setData({
      movementData: movementData,
      movementList: movementList
    })
  },

  done: function (e) {
     wx.switchTab({
        url: '/pages/run/run',
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
    app.globalData.movementData = this.data.movementData
    app.globalData.movementList = this.data.movementList
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