// pages/person/person.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
   onShow:function(){
     if(this.data.userInfo==''){
       this.setData({
       'item.signinHidden':false
       })
     }
 
   },
  })