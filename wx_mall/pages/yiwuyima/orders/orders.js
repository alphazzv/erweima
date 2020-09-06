
Page({

  data: {
    orderList: [],
    waitList:[],
    allOrderList: [],
    startX: 0, 
    startY: 0,
    size: 8,
    showType: 9,
    hasOrder: 0,
    showTips: 0,
    status: {}
  },
  switchTab: function(e) {
    let showType =e.currentTarget.dataset.index;
    wx.setStorageSync('showType', showType);
    this.setData({
        showType: wx.getStorageSync('showType'),

    });
    this.onReady();
},
onReady:function()
{

  var thit=this;
  thit.data.allOrderList=[];
  thit.data.orderList=[];
  wx.request({
    url: 'https://stu.hrbkyd.com/QRCodeMall/user/myBill?pageNum=1',
    method:'GET',
    header:{
      'content-type':'application/json',
      'cookie': wx.getStorageSync("sessionid")
    },
    success:function(res)
    {
      console.log(res);
      if(res.data.code ==200){
        if(thit.data.showType ==0)
      {thit.setData({
        
        allOrderList: res.data.data.list
        
      })}
      else if(thit.data.showType == 1)
      {
        
        res.data.data.list.forEach(function (v, i) {
          if (v.userBillDirection == 0)
            thit.data.orderList.push(res.data.data.list[i]);
        })
        thit.setData({
        
          allOrderList: thit.data.orderList
          
        })
      }
      else if(thit.data.showType == 2)
      {
        res.data.data.list.forEach(function (v, i) {
          if (v.userBillDirection == 1)
            thit.data.waitList.push(res.data.data.list[i]);
        })
        thit.setData({
        
          allOrderList: thit.data.waitList
          
        })
      }
    }
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
        }
        
    })
  }
  if(res.data.data.length==0)
        {
          thit.setData({
            showTips:1
          })
        }
}
  })
},
onShow:function()
{
  let showType = wx.getStorageSync('showType');
  console.log (this.data.allOrderList.length)

  this.setData({
    showType: wx.getStorageSync('showType'),
    
  })
  
},
touchstart: function (e) {
  this.data.allOrderList.forEach(function (v, i) {
    if (v.isTouchMove)
      v.isTouchMove = false;
  })
  this.setData({
    startX: e.changedTouches[0].clientX,
    allOrderList: this.data.allOrderList
  })
  console.log(this.data.startY)
},
touchmove: function (e) {
  var that = this,
    index = e.currentTarget.dataset.index,//当前索引
    startX = that.data.startX,//开始X坐标
    touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
    
    //获取滑动角度
    angle = that.angle({ X: startX}, { X: touchMoveX });
    that.data.allOrderList.forEach(function (v, i) {
    v.isTouchMove = false
    //滑动超过30度角 return
    if (Math.abs(angle) > 30) return;
    if (i == index) {
      if (touchMoveX > startX) //右滑
        v.isTouchMove = false
      else //左滑
        v.isTouchMove = true
    }
    console.log(that.data.startY)
  })
  //更新数据
  that.setData({
    allOrderList: that.data.allOrderList
  })
},

angle: function (start, end) {
  var _X = end.X - start.X;
  var _Y =0;
  return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
},
delete:function(e)
{
  var that=this;
  wx.showModal({
    title: '提示',
    content: '确认删除？',
    success: function(res) {
      if (res.confirm) {
        console.log(e.target.dataset.id)
        wx.request({
    
          url: 'https://stu.hrbkyd.com/QRCodeMall/user/deleteBill?userBillId='+e.target.dataset.id,
          method: "DELETE",
          header: {
            'content-type': 'application/json',
             
          },
          success: function (res) {
            console.log(res)
            that.onReady();
          }
        })
      } else if (res.cancel) {
        
      }
    }
  })
}
})
