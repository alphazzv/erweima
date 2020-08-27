Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"",
    password:"",
    email:"",
    rptpassword:"",
    phonenum:"",
    tjr:"",
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
   // 获取密码 
   getrptpassword: function (e) {
    this.setData({
      rptpassword: e.detail.value
    })
  },
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
    //获取推荐人
    gettjr: function (e) {
      this.setData({
        tjr: e.detail.value
      })
    },
  // 登录 
 check: function () {
    var that = this;   
    var warn = null; 
     console.log(that.data.message)
     console.log(that.data.email)
     console.log(that.data.rptpassword)
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
    }else if (that.data.password !== that.data.rptpassword) {
      wx.showToast({
        title: '输入密码不一致',
        duration: 1000
      })
    }
    else {
      
      wx.request({
        url: 'https://stu.hrbkyd.com/QRCodeMall/user/register',
        method: "POST",
        data: {
          "isDeleted": 0,
          "isVip": 0,
          "userEmail": that.data.email,
          "userFatherProxyId": 0,
          "userFatherProxyName": that.data.tjr,
          "userGrandfatherProxyId": 0,
          "userGrandfatherProxyName": "string",
          "userId": 0,
          "userName": that.data.message,
          "userPassword": that.data.password,
          "userPhone": that.data.phonenum,
          "userPoint": 0
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if (res.data.code != 201) {  
            warn =res.data.message;
            wx.showModal({
              title: '提示',
              content: warn
            })
            return;
          } else {
            that.setData({
              success: true,
             

            }),
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            }),
            wx.navigateTo
              ({
              url: '/pages/yiwuyima/mine/login/login',
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