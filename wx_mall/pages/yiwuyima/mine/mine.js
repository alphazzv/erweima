// pages/person/person.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasuserInfo:true,
    username:null
    },
   jj:function()
   {wx.navigateTo({
    url: '/pages/huinong/jianjie/index'
  })},
  kf:function()
  { wx.showModal({
    title: '线上客服调试中~',
    content:'店主WX：xxx',
    text:'center',
    complete() {
      wx.switchTab({
        url: '/pages/mine/mine'
      })
    }
  })},
   onReady:function(){
    
     // 页面渲染完成
   },
 gotologin:function(){
    wx.navigateTo({
      url: '/pages/yiwuyima/mine/login/login',
    })
  },
  userdetail:function(){
    wx.navigateTo({
      url: '/pages/yiwuyima/mine/userdetail/userdetail',
    })
  },
  onShow:function()
  { var that=this;
    this.setData({
    hasuserInfo:wx.getStorageSync('iflogin'),    
    username:wx.getStorageSync('username')
    })
    console.log(this.hasuserInfo)
    console.log(this.username)
  },
  logout:function()
  {
    var that=this;
    wx.showModal({
    content:'是否确认退出？',
    showCancel: true,
    cancelText:"否",
    cancelColor:'skyblue',
    confirmText:"是",
    confirmColor: 'skyblue',
    success: function (res) {
       if (res.cancel) {
       } 
       else 
       {
        wx.request({ 
          url: 'https://stu.hrbkyd.com/QRCodeMall/user/logout',
          method:'GET',
          header:{
            'content-type':'application/json'
          },
          success:function(res)
           {
            wx.setStorageSync('iflogin',false),
            wx.setStorageSync('username',null)
            that.setData({
              hasuserInfo:wx.getStorageSync('iflogin'),    
              username:wx.getStorageSync('username')
              })
              },
       })
  
    }
  } 
  })
},
})