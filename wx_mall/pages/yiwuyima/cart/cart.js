// page/component/new-pages/cart/cart.js
Page({
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,     // 总价，初始为0
    goodsCount:0,
    selectAllStatus:true   // 全选状态，默认全
  },
  zf:function()
  { var adds = wx.getStorageSync('cartt')||[];
    
  
      console.log(this.data.totalPrice)
     
    wx.request({
      url: 'https://stu.hrbkyd.com/QRCodeMall/user/addBill',
      data: {
        "userBillDirection": 0,
        "userBillMoney": this.data.totalPrice,
        "userId":wx.getStorageSync("userid")
        },
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync("sessionid")
        },
      method: 'POST', 
      success: function (res) {
        console.log(JSON.stringify(res.data))
      },
      fail: function (res) {
        console.log('wrong' + ':' + res)
      },
    });
    this.setData({
      hasList: false,
    });
    try{
      wx.setStorageSync('cartt',[])
      wx.request({
        url: 'https://stu.hrbkyd.com/QRCodeMall/goods/deleteAllShoppingCartGoods',
        method: 'DELETE', 
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
        },
       
      });

    }
    catch(e)
    {console.log(e)}
  },
onShow()
  {
    var that=this;
    var arc=wx.getStorageSync('cartt')||[];
    console.log(arc.length)
    console.log(arc)
    if(arc.length>0)
    {
      this.setData({
        hasList:true,
        carts:arc
      });
    }
    this.selectAll();
    this.getTotalPrice();
  },
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  deleteList(e) {
    console.log(e.currentTarget.id)
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    wx.request({
      url: 'https://stu.hrbkyd.com/QRCodeMall/goods/deleteShoppingCartGoods',
      method: 'POST', 
      data: 
        [e.currentTarget.id]
        ,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      },
     
    });

  
    if(!carts.length){
      this.setData({
        hasList: false,
      });
      
      try{
        wx.setStorageSync('cartt', this.data.carts)
      }
      catch(e)
      {console.log(e)}
    }else{
      this.getTotalPrice();
    }
  },

  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].goodsStatus;
    num = num + 1;
    carts[index].goodsStatus = num;
    this.setData({
      carts: carts
    });
    try{
      wx.setStorageSync('cartt', this.data.carts)
    }
    catch(e)
    {console.log(e)}

    this.getTotalPrice();
  },

  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].goodsStatus;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].goodsStatus = num;
    this.setData({
      carts: carts
    });
    try{
      wx.setStorageSync('cartt', this.data.carts)
    }
    catch(e)
    {console.log(e)}
    this.getTotalPrice();
  },

  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].goodsStatus * carts[i].goodsPrice;   // 所有价格加起来
      }
    }
    this.setData({                    
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  }

})