const app = getApp()
Page({
  data: {
    list_length: 0,
    item_open: false,
    infoWeight: 0,
    totalCal: 0,
    list: {},
    array: [],
    index: 40,
    time: 1,
    clockShow: false,
    clockHeight: 0,
    timer: null,
    mTime: 300000,
    eTime: 290000,
    timeStr: '05:00',
    rate: '',
    openid: '',
    Y: '',
    M: '',
    D: '',
    h: '',
    m: '',
    s: '',
    okShow: false,
    pauseShow: true,
    continueCancleShow: false
  },

  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'infoWeight',
      success: function (res) {
        console.log("index:" + res.data)
        if (res.data) {
          that.setData({
            //infoWeight: 30 + 0.5 * res.data,
            infoWeight: res.data
          })
        }
      },
      fail: function () {
        wx.showModal({
          content: '这是你第一次使用本功能，请先设置体重',
          confirmText: "带我去",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/bmi/bmi',
              })
            }
          }
        });
      }
    })
    this.calculate()  
  },
  onLoad: function () {
    var array = []
    for (var i = 30; i < 150; i++) {
      array.push(i);
      array.push(i + 0.5);
    }
    this.setData({
      array: array
    })
    //750rpx
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;
    this.setData({
      rate: rate,
      clockHeight: rate * res.windowHeight
    })
  },
  calculate(){
    var list = app.globalData.movementList;
    var list_length = 0
    var totalCal = 0
    for (var id in list) {
      list_length++
      totalCal += list[id][1] * list[id][2] / 60
    }

    this.setData({
      list: list,
      list_length: list_length,
      item_open: this.data.item_open || list_length,
      totalCal: parseFloat((totalCal * this.data.infoWeight).toFixed(1))
    });

    app.globalData.movement_comsume = this.data.totalCal
  },
  kindToggle: function (e) {
    this.setData({
      item_open: !this.data.item_open
    })

  },
  bindPickerChange: function (e) {
    try {
      wx.setStorageSync('infoWeight', e.detail.value)
      this.setData({
        infoWeight: 30 + 0.5 * e.detail.value
      })
    } catch (e) {
    }
  },
  addMovement: function (id) {
    wx.redirectTo({
      url: '/pages/movement/movement',
    })
  },

  delMovement: function (e) {
    var id = e.currentTarget.id, list = app.globalData.movementList, mlist = app.globalData.movementData
    console.log(id)
    delete list[id]
    mlist[id][2] = 0
    this.calculate()
  },

  slideChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  start: function () {
    var app = getApp()
    if (!app.globalData.hasUserInfo) {
      wx.showModal({
        title: '温馨提示',
        content: '登录才能进行计时',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '/pages/bmi/bmi'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {

      this.setData({
        clockShow: true,
        mTime: this.data.time * 60 * 1000,
        eTime: this.data.time * 60 * 1000 - 1000,
        timeStr: parseInt(this.data.time) >= 10 ? this.data.time + ':00' : '0' + this.data.time + ':00'
      })
      this.drawBg();
      this.drawActive();
    }
  },

  drawBg: function () {
    var lineWidth = 6 / this.data.rate;
    var ctx = wx.createCanvasContext('progress_bg');
    ctx.setLineWidth(lineWidth);
    ctx.setStrokeStyle('#000000');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.draw();
  },
  drawActive: function () {
    var _this = this;
    var timer = setInterval(function () {
      var angle = 1.5 + 2 * (_this.data.time * 60 * 1000 - _this.data.eTime) / (_this.data.time * 60 * 1000);
      var currentTime = _this.data.mTime - 1000;
      var currentTime1 = _this.data.eTime - 1000;
      _this.setData({
        mTime: currentTime,
        eTime: currentTime1
      });
      if (angle < 3.5) {
        if (currentTime % 1000 == 0) {
          var timeStr1 = currentTime / 1000; // s 59
          var timeStr2 = parseInt(timeStr1 / 60); // m  0
          var timeStr3 = (timeStr1 - timeStr2 * 60) >= 10 ? (timeStr1 - timeStr2 * 60) : '0' + (timeStr1 - timeStr2 * 60).toString();
          var timeStr4 = timeStr2 >= 10 ? timeStr2 : '0' + timeStr2.toString();
          _this.setData({
            timeStr: timeStr4 + ':' + timeStr3
          })
        }
        var lineWidth = 6 / _this.data.rate;
        var ctx = wx.createCanvasContext('progress_active');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#ffffff');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 400 / _this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false);
        ctx.stroke();
        ctx.draw();
      }
      else {
        var lineWidth = 6 / _this.data.rate;
        var ctx = wx.createCanvasContext('progress_active');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#ffffff');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 400 / _this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false);
        ctx.stroke();
        ctx.draw();
        _this.setData({
          timeStr: '00:00',
          okShow: true,
          pauseShow: false,
          continueCancleShow: false
        })
        clearInterval(timer);
      }
    }, 1000);
    _this.setData({
      timer: timer
    })
  },
  pause: function () {
    clearInterval(this.data.timer);
    this.setData({
      pauseShow: false,
      continueCancleShow: true,
      okShow: false
    })
  },
  continue: function () {
    this.drawActive();
    this.setData({
      pauseShow: true,
      continueCancleShow: false,
      okShow: false
    })
  },
  cancle: function () {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '您真的要放弃吗？不再坚持一下了吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          clearInterval(that.data.timer);
          that.setData({
            pauseShow: true,
            continueCancleShow: false,
            okShow: false,
            clockShow: false
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  ok: function (event) {
    clearInterval(this.data.timer);
    this.setData({
      pauseShow: true,
      continueCancleShow: false,
      okShow: false,
      clockShow: false
    })
  }

});