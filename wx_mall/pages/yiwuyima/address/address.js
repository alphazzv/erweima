const app = getApp()
Page({

  data: {

          addresses: [],
          addressess:[]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onReady: function (options) {
    var thit=this;
    wx.request({
      url: 'https://stu.hrbkyd.com/QRCodeMall/user/myAddress?pageNum=1',
      method:'GET',
      header:{
        'content-type':'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success:function(res)
      {console.log(res);
        if(res.data.code ==200){
        thit.setData({
          addresses: res.data.data
        })}
        else{
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
            wx.setStorageSync('addresses', []);
          }
      })
    }
  }
    })
},
  delAddress: function (e) {
   console.log(e.target.dataset.id)
    this.data.addresses.splice(e.target.id.substring(3), 1);
    // 更新data数据对象  
    if (this.data.addresses.length > 0) {
      this.setData({
        addresses: this.data.addresses
      })
      wx.setStorageSync('addresses', this.data.addresses);
    } else {
      this.setData({
        addresses: this.data.addresses
      })
      wx.setStorageSync('addresses', []);
    }
    wx.request({
    
      url: 'https://stu.hrbkyd.com/QRCodeMall/user/deleteAddress?userAddressId='+e.target.dataset.id,
      method: "DELETE",
      header: {
        'content-type': 'application/json',
         
      },
      success: function (res) {
        console.log(res)
      }
    })
    this.onReady()
  },
  onShow:function()
  {
    this.onReady()
  },
  wxaddress: function () {
    var that=this;
    if (this.data.addresses.length == 0)
    {
      var azxx = 1;

    }
    else
    {var azxx = 0;}
    wx.chooseAddress({
      
      success: function (res) {
          console.log(res.userName)
          wx.request({
    
            url: 'https://stu.hrbkyd.com/QRCodeMall/user/addAddress',
            method: "POST",
                    data: {
                      
                "receiveName": res.userName,
                "receivePhone": res.telNumber,
                "userAddressCity": res.cityName,
                "userAddressDefault": azxx,
                "userAddressDetail": res.detailInfo,
                "userAddressDistrict":res.countyName,
                "userAddressId": 0,
                "userAddressProvince": res.provinceName,
                "userId": wx.getStorageSync("userid")
              
            },
            header: {
              'content-type': 'application/json',
              'cookie': wx.getStorageSync("sessionid")
            },
            success: function (res) {
              console.log(res)
              if (res.data.code != 201) {  
                var warn =res.data.message;
                wx.showModal({
                  title: '提示',
                  content: warn
                })
                return;
              }
               else {
                
        
          }
        }
      })
     

 
    },
  
  })
    },
  moren:function(e){
    var that=this;
    wx.showModal({
    content:'是否设为默认？',
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
        
        for(let i = 0; i<that.data.addresses.length; i++)
        {
          console.log(that.data.addresses[i].userAddressDefault)
          if(that.data.addresses[i].userAddressDefault == 1)
          {
            console.log(that.data.addresses[i].userAddressId)
            wx.request({
              url: 'https://stu.hrbkyd.com/QRCodeMall/user/updateAddress',
              method: "PUT",
              data: {
                "userAddressDefault":0,      
                  "userAddressId":that.data.addresses[i].userAddressId,
                    },
              header: {
                'content-type': 'application/json',
                'cookie': wx.getStorageSync("sessionid")
              },
              success: function (res) {
                console.log(res)
              }      
          })
        }
        wx.request({
          url: 'https://stu.hrbkyd.com/QRCodeMall/user/updateAddress',
          method: "PUT",
          data: {
              "userAddressDefault":1,      
              "userAddressId":e.target.dataset.id,
                },
          header: {
            'content-type': 'application/json',
            'cookie': wx.getStorageSync("sessionid")
          },
          success: function (res) {
            console.log(res)
          that.onReady()
          }      
      })
        }
        
       
       }
       
  }

  })

  
}
})
