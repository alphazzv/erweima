
Page({

  data: {
    orderList: [],
    allOrderList: [],
    allPage: 1,
    allCount: 0,
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
    // this.getOrderInfo();
    // this.getOrderList();
},
onShow:function()
{
  let showType = wx.getStorageSync('showType');
  console.log (this.data.orderList.length)
  this.setData({
    showType: wx.getStorageSync('showType'),
  })
  
},
})
