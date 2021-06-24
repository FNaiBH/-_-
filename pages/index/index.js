const app = getApp()
Page({
  data:{
    list:{},
    total_takein:0,
    total_consume:0,
    sub:0
  },
  onShow:function(){
    this.calculate()
  },

  onLoad:function(){
    this.setData({
      list: app.globalData.list
    });
  },

  calculate: function(){
    var list = app.globalData.list;
    var total_takein = 0
    var consume = 0
    if (app.globalData.base_comsume == 0){
      if (consume = wx.getStorageSync('infoConsume'))
        app.globalData.base_comsume = consume     
    }
    var total_consume = parseFloat(app.globalData.movement_comsume) + parseFloat(app.globalData.base_comsume)
    for (var i in list) {
      list[i].open = list[i].open && list[i].items.length
      total_takein += parseFloat(list[i].total)
    }
    this.setData({
      list: list,
      total_takein: total_takein.toFixed(1),
      total_consume: total_consume.toFixed(1),
      sub: (total_takein - total_consume).toFixed(1)
    });
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i in list) {
      if (i == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    app.globalData.list = list
    if (list[id].items.length<1){
      this.searchFood(id)
    } else {
      this.setData({
        list: list
      });
    }

  },
  searchFood: function (id) {
    wx.navigateTo({
      url: '/pages/search/search?type=' + id,
    })
  },
  addFood: function (e) {
    var id = '', list = this.data.list;
    for (var i in list) {
      if (list[i].open) {
        id = i
        break
      }
    }
    this.searchFood(id)
  },
  delFood: function (e) {
    var id = parseInt(e.currentTarget.id),list = this.data.list
    for(var item in list){
      console.log(item)
      if (list[item]['open']){
        list[item]['total'] = parseFloat((list[item]['total'] - list[item]['items'][id]['cal']).toFixed(1))
        list[item]['items'].splice(id, 1)
        break;
      }
    }
    app.globalData.list = list
    this.calculate()
  }
});
