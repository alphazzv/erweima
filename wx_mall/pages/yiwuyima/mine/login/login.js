// pages/yiwuyima/mine/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"",
    password:"",
    success:false,
    userid:null,
    datas:{}
  },
  // 获取账号 
  getmessage: function (e) {
    this.setData({
      message: e.detail.value
    })
  },
  // 获取密码 
  getpassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登录 
 check: function () {
    var that = this;   
    var warn = null; 
     console.log(that.data.message)
     console.log(that.data.password)
    if (that.data.message.length == 0) {
      wx.showToast({
        title: '用户名不能为空',
        duration: 1000
      })
    } else if (that.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        duration: 1000
      })
    }else {
      
      wx.request({
        url: 'https://stu.hrbkyd.com/QRCodeMall/user/login',
        method: "POST",
        data: {
          "account": that.data.message,
          "password": that.data.password
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 401) {  
            warn = "用户未注册";
            wx.showModal({
              title: '提示',
              content: warn
            })
            return;
          } else {
            that.setData({
              success: true,
            }),
            console.log(res.header)
            wx.removeStorageSync('sessionid') 
            wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
            wx.setStorageSync('iflogin',that.data.success),
            wx.setStorageSync('username',that.data.message),
            wx.switchTab({
              url: '/pages/yiwuyima/mine/mine',
            })
          }
        }
 
      })
 
 
 
    }
  },
 zhuce:function(){
    wx.navigateTo({
      url: '/pages/yiwuyima/mine/register/register',
    })
 },
})