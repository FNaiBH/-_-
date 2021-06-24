const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searching: false,
    searched: false,
    inputShowed: false,
    inputVal: "",
    foodType: '',
    items: [],
    array: {},
    start: 50,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var array = []
    for (var i = 1; i < 301; i++) {
      array.push(i+' g');
    }
    this.setData({
      foodType: options.type,
      array: array
    })
    //this.search(input_text)
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  search: function (text) {
    this.setData({
      searching: true
    })
    var self = this
    console.log('GET ' + text)
    wx.request({
      url: 'http://121.5.161.245:8087/food/getFoodByName?name=' + text,
      success(res) {
        console.log(res.data)
        self.setData({
          searching: false,
          items: res.data,
          searched: true
        })
      }
    })
  },

  /*textInput: function (e) {
    this.setData({
      input_text: e.detail.value
    })
  },*/

  btnSearch: function () {
    this.search(this.data.inputVal)
  },

  selectFood: function (e) {
    var id = parseInt(e.currentTarget.id), list = app.globalData.list;
    var weight = 1 + parseInt(e.detail.value)
    var cal = parseFloat((parseFloat(this.data.items[id]['calorie']) * weight / 100).toFixed(1))
    var food = {}
    food['name'] = this.data.items[id]['name']
    food['cal'] = cal
    food['weight'] = weight
    console.log(food)
    list[this.data.foodType].items.push(food)
    list[this.data.foodType].total += cal
    wx.switchTab({
      url: '/pages/index/index',
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