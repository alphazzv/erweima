// page/component/new-pages/cart/cart.js
Page({
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,     // 总价，初始为0
    goodsCount:0,
    selectAllStatus:true   // 全选状态，默认全
  },
  /**
   * 当前商品选中事件
   */
  zf:function()
  { var adds = wx.getStorageSync('cartt')||[];
    
    for (var index in adds) 
    {
      var jsonObj = {"goodsId":adds[index].goodsId};
      console.log(adds[index].goodsId)
     
    wx.request({
      url: 'https://stu.hrbkyd.com/QRCodeMall/goods/addToShoppingCart',
      data: jsonObj,
      method: 'POST', 
      header: {
        'content-type': 'application/json'
      },
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
  }},
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

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index,1);
    this.setData({
      carts: carts
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

  /**
   * 购物车全选事件
   */
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

  /**
   * 绑定加数量事件
   */
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

  /**
   * 绑定减数量事件
   */
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

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].goodsStatus * carts[i].goodsPrice;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  }

})