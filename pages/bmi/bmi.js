const app = getApp()
Page({
  data: {
    userInfo: {},
    canIUseGetUserProfile: true,
    hasUserInfo: false,
    array1: {},
    array2: {},
    array3: {},
    dx: {},
    daixie: 0,
    BMI: 0,
    bmi: {},
    sex: [
      { name: '0', value: '男', checked: true },
      { name: '1', value: '女', checked: false },
    ],
    gender: 0,
    height: 0,
    weight: 0,
    age: 0,
  },

  getUserProfile() {
    var app = getApp()
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.hasUserInfo = true
      }
    })
  },

  onLoad: function (options) {
    var array1 = []
    var array2 = []
    var array3 = []
    var that = this;
    for (var i = 140; i < 221; i++) {
      array1.push(i);
    }
    for (var j = 30; j < 150; j++) {
      array2.push(j);
    }
    for (var k = 11; k < 90; k++) {
      array3.push(k);
    }
    this.setData({
      array1: array1,
      array2: array2,
      array3: array3,
    })
    
    wx.getStorage({
      key: 'infoGender',
      success: function (res) {
        if (res.data) {
          var sex =  
          sex[res.data].checked = true
          sex[1 - res.data].checked = false
          that.setData({
            gender: res.data,
            sex: sex
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoWeight',
      success: function (res) {
        if (res.data) {
          that.setData({
            height: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoWeight',
      success: function (res) {
        if (res.data) {
          that.setData({
            weight: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoHeight',
      success: function (res) {
        if (res.data) {
          that.setData({
            height: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'infoAge',
      success: function (res) {
        if (res.data) {
          that.setData({
            age: res.data
          })
        }
      }
    })
  },
  sexChange: function (e) {
    console.log('性别：', e.detail.value)
    this.setData({
      gender: e.detail.value
    })
    try {
      wx.setStorage({ key: 'infoGender', data: parseInt(e.detail.value) })
    } catch (e) {

    }
  },
  bindHeightChange: function (e) {
    console.log('height值', this.data.array1[e.detail.value])
    this.setData({
      height: this.data.array1[e.detail.value]
    })
    try {
      wx.setStorage({ key: 'infoHeight', data: this.data.array1[e.detail.value] })
    } catch (e) {

    }
  },
  bindWeightChange: function (e) {
    console.log('weight值', this.data.array2[e.detail.value])
    this.setData({
      weight: this.data.array2[e.detail.value]
    })
    try {
      wx.setStorage({ key: 'infoWeight', data: this.data.array2[e.detail.value] })
    } catch (e) {

    }
  },
  bindAgeChange: function (e) {
    console.log('age值', this.data.array3[e.detail.value])
    this.setData({
      age: this.data.array3[e.detail.value]
    })
    try {
      wx.setStorage({ key: 'infoAge', data: this.data.array3[e.detail.value] })
    } catch (e) {

    }
  },
  bmi: function (e) {
    var height = parseInt(this.data.height);
    var weight = parseInt(this.data.weight);
    var bmi = weight / (height / 100 * height / 100);
    this.data.bmi = bmi;
    this.setData({
      BMI: this.data.bmi.toFixed(1)
    })
  },
  consume: function (e) {
    var height = parseInt(this.data.height);
    var weight = parseInt(this.data.weight);
    var age = parseInt(this.data.age);
    var sex = this.data.gender;
    console.log("height:", height);
    console.log("weight:", weight);
    console.log("age:", age);
    console.log("sex:", sex);
    var A;
    var dxl;
    //判断dxl
    if (age >= 11 && age <= 15) {
      if (sex == 0) {
        dxl = 46.7;
      }
      else if (sex == 1) {
        dxl = 41.2;
      }
    }
    else if (age >= 16 && age <= 17) {
      if (sex == 0) {
        dxl = 46.2;
      }
      else if (sex == 1) {
        dxl = 43.4;
      }
    }
    else if (age >= 18 && age <= 19) {
      if (sex == 0) {
        dxl = 39.7;
      }
      else if (sex == 1) {
        dxl = 37.7;
      }
    }
    else if (age >= 20 && age <= 30) {
      if (sex == 0) {
        dxl = 37.7;
      }
      else if (sex == 1) {
        dxl = 35.0;
      }
    }
    else if (age >= 31 && age <= 40) {
      if (sex == 0) {
        dxl = 37.9;
      }
      else if (sex == 1) {
        dxl = 35.0;
      }
    }
    else if (age >= 41 && age <= 50) {
      if (sex == 0) {
        dxl = 36.8;
      }
      else if (sex == 1) {
        dxl = 34.0;
      }
    }
    else if (age >= 51 && age <= 60) {
      if (sex == 0) {
        dxl = 35.6;
      }
      else if (sex == 1) {
        dxl = 33.1;
      }
    }
    console.log("dxl:", dxl);
    //计算A
    if (sex == 0) {
      A = 0.00607 * height + 0.0127 * weight - 0.0698;
    }
    else if (sex == 1) {
      A = 0.00568 * height + 0.0126 * weight - 0.0461;
    }
    console.log("A:", A)
    var dx = A * dxl * 24;
    this.data.dx = dx;
    console.log("dx:", dx)
    this.setData({
      daixie: this.data.dx.toFixed(1)
    })
    try {
      wx.setStorageSync('infoConsume', this.data.daixie)
    } catch (e) {

    }
    //app.globalData.base_comsume = this.data.daixie
  }

});