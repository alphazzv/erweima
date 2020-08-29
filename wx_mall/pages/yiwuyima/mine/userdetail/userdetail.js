
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    myinfo:null
  
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thit=this;
    wx.request({
      url: 'https://stu.hrbkyd.com/QRCodeMall/user/my',
      method:'GET',
      header:{
        'content-type':'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success:function(res)
      {
        console.log(res);
        if (res.data.code == 401) {  
        
          wx.showModal({
            title: '提示',
            content:'登录信息过期，请重新登录',
            showCancel:false,
            confirmColor: 'skyblue',
           success: function (res) {
            wx.switchTab({
              url: '/pages/yiwuyima/mine/mine',
            })
            wx.setStorageSync('iflogin',false)
            
           }
          })
          
        } else {
        thit.setData({ myinfo: res.data.data });
        wx.setStorageSync("userid", res.data.data.userId);
        }
      },
      fail:function(res)
      {
        console.log("fff");
      }
    
    // console.log(this.data.myinfo);
  })
  },
  back:function()
  {
    wx.switchTab({
      url: '/pages/yiwuyima/mine/mine',
    })
  },
  new:function()
  {
    wx.navigateTo({
      url: '/pages/yiwuyima/mine/userxg/userxg',
    })
  }
  })
