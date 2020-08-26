//index.js
const api = require('../../../config/api.js');
//获取应用实例
var app = getApp()

Page({
  data: {
    toView: "",
    motto: '惠农',
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    allGoods: [],
    hotgoods: [{
      "more_pic": "http://img13.yiguoimg.com/e/albums/2017/170630/153403897791357662_800x468.jpg"
    }, {
      "more_pic": "http://img14.yiguoimg.com/e/albums/2017/170629/153403897729786589_800x468.jpg",
    }, {
      "more_pic": " http://img12.yiguoimg.com/e/albums/2017/170626/153403897618375386_596x379.jpg",
    }, {
      "more_pic": " http://img12.yiguoimg.com/e/albums/2017/170621/153403897468003029_800x468.jpg",
    }



    ],
    banner_list: [
      {
        "banner": [
          {
            "pic_url": "https://stu.hrbkyd.com/QRCodeMall/Carousel/addCarousel?carouselLink=1",
          },
          {
            "pic_url": "http://img11.yiguoimg.com/e/ad/2016/160927/585749449690947899_800x400.jpg",
          },
          {
            "pic_url": "http://img14.yiguoimg.com/e/ad/2016/160923/585749449636290871_800x400.jpg",
          },
          {
            "pic_url": "http://img13.yiguoimg.com/e/ad/2016/160914/585749449480315182_800x400.jpg",
          },
          {
            "pic_url": "http://img14.yiguoimg.com/e/ad/2016/161010/585749449889390922_800x400.jpg",
          }
        ]
      },
      {
        "banner": []
      }
    ],
    xinxiUrls: 
    [
      'aaaaaaaaaaaaaa',
      'bbbbbbbbbbbbbb',
      '阿巴阿巴阿巴阿巴阿巴阿巴'
    ],
  },
  xx:function(options){
    var thit=this;
    wx.request({
      url: 'https://stu.hrbkyd.com/QRCodeMall/goods/allGoods',
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res)
      {console.log(res);
      },
      fail:function(res)
      {
        console.log("fff");
      }

    })

  },
  getData: function ()
  {
     var that = this;
     wx.request({ 
    url: api.GoodList,
    method:'GET',
    header:{
      'content-type':'application/json'
    },
    success:function(res)
     {
        console.log(res.data.data);
          that.setData
        ({
            allGoods:res.data.data,
          });      
        },
     },
     )},

  lookdetail:function(e){
    var lookid=e.currentTarget.dataset;
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url:"/pages/yiwuyima/detail/detail?id="+lookid.id
    })
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },
  scroll: function (e) {
    if (this.data.toView == "top") {
      this.setData({
        toView: ""
      })
    }
  },
 gotoList: function (e) {
    wx.switchTab({
        url: '/pages/yiwuyima/list/list',
    })
},
 jump:function(){
    wx.navigateTo({
      url: '/pages/yiwuyima/jianjie/index',
    })
 },
zanshilogin:function(){
  wx.navigateTo({
    url: '/pages/yiwuyima/mine/login/login',
  })
},
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tap: function () {
    this.setData({
      toView: "top"
    })
  },
onLoad: function () 
{
  this.getData();
}
})
