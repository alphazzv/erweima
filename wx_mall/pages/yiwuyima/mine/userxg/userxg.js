Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"",
    email:"",
    phonenum:"",
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

  //获取邮箱
  getemail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  //获取手机号
  getphonenum: function (e) {
    this.setData({
      phonenum: e.detail.value
    })
  },

  // 登录 
 check: function () {
    var that = this;   
    var warn = null; 
     console.log(that.data.message)
     console.log(that.data.email)   
     if (that.data.message.length != 0)
     {
      wx.request({
        url: 'https://stu.hrbkyd.com/QRCodeMall/user/modify',
        method: "PUT",
        data: {
          "userName": that.data.message,
          "userId":wx.getStorageSync("userid")
        },
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync("sessionid")
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 201) {  
            that.setData({
              success: true,
            }),
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '修改成功，请重新登录',
              success: function (res) {
                wx.switchTab({
                  url: '/pages/yiwuyima/mine/mine',
                })
                wx.setStorageSync('iflogin',false)
              }
              
            })
            return;
          } else {
            warn =res.data.message;
            
            wx.showToast({
              title:warn,
              icon: 'none',
              duration: 2000
            })
          }
        }
       })
     }  
     if (that.data.email.length != 0)
     {
      wx.request({
        url: 'https://stu.hrbkyd.com/QRCodeMall/user/modify',
        method: "PUT",
        data: {
          "userEmail": that.data.email,
          "userId":wx.getStorageSync("userid")
        },
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync("sessionid")
        },
        success: function (res) {
          console.log(res)
          
          if (res.data.code == 201) {  
            that.setData({
              success: false,
            }),
            wx.showModal({
              title: '提示',
              showCancel: true,
              content: '修改成功，请重新登录',
              success: function (res) {
                wx.switchTab({
                  url: '/pages/yiwuyima/mine/mine',
                })
                wx.setStorageSync('iflogin',false)
              }
            })
            return;
          } else {
            warn =res.data.message;
            
            wx.showToast({
              title:warn,
              icon: 'none',
              duration: 2000
            })
          }
        }
       })
     }  
      
     if (that.data.phonenum.length != 0)
     {
      wx.request({
        url: 'https://stu.hrbkyd.com/QRCodeMall/admin/updateUser',
        method: "PUT",
        data: {
            "userPhone": that.data.phonenum,
            "userId":wx.getStorageSync("userid")
              },
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync("sessionid")
        },
        success: function (res) {
          console.log(res)
          
          if (res.data.code == 201) {  
            that.setData({
              success: false,
            }),
            wx.showModal({
              title: '提示',
              content: '修改成功，请重新登录',
              showCancel: true,
              success: function (res) {
                wx.switchTab({
                  url: '/pages/yiwuyima/mine/mine',
                })
                wx.setStorageSync('iflogin',false)
              }
            })
            return;
          } else {
            warn =res.data.message;
            wx.showToast({
              title:warn,
              icon: 'none',
              duration: 2000
            })
          }
        }
       })
     }  
     

  },
})
