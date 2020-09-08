const api = require('../../../config/api.js');
Page({
  data:{
      detailgood:{},
      listgood:[],
 hotgoods:[
      {
        "more_pic":"http://img10.yiguoimg.com/e/ad/2016/161008/585749449862226248_778x303.jpg"
      }
    ],
  },
  getData: function ()
  {
     var that = this;
     wx.request({ 
    url: api.GoodList,
    method:'GET',
    header:{
      'content-type':'application/json'
    },
    success:function(res)
     {
        console.log(res.data.data);
          that.setData
        ({
            listgood:res.data.data.list,
            
          });      
        },
     },
     )},
  onLoad: function (options) 
  {
    this.getData();
    const that = this;
    const url = 'https://stu.hrbkyd.com/QRCodeMall/goods/' + options.goodsId;
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'json'
      },
      success:function(res) {
        console.log(res)
        that.setData({
          detailgood: res.data.data,
    })
  }
    })
  },
  zf:function()
  { wx.showModal({
    content:'暂不开放支付功能',
  })},
  addCart:function(e){
    this.setData({
        toastHidden:false
    });
    console.log(e.target.id)
    for (var i in this.data.listgood){
       
        if(this.data.listgood[i].goodsId == e.target.id){
            
            this.data.listgood[i].goodsStatus = 1;
      
            var arc = wx.getStorageSync('cartt') || [];
    
            if(arc.length>0){
                for(var j in arc){
                
                    if(arc[j].goodsId == e.target.id){
                      
                        arc[j].goodsStatus = 1;
                        
                        try {
                            wx.setStorageSync('cartt', arc)
                        } catch (e) {
                            console.log(e)
                        }
                        
                        return;
                    }
                }
            
                arc.push(this.data.listgood[i]);
                
                wx.showToast({
                  title: '已加入购物车',
                  icon:"success",
                  duration:3000
                })
            }
    
            else{
                arc.push(this.data.listgood[i]);
                console.log(arc)
                wx.showToast({
                  title: '已加入购物车',
                  icon:"success",
                  duration:3000
                })
            }
            wx.request({
              url: 'https://stu.hrbkyd.com/QRCodeMall/goods/addToShoppingCart',
              data: {
                "goodsId": this.data.detailgood.goodsId,
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
            })
            try {
                wx.setStorageSync('cartt', arc)
               
                return;
            } catch (e) {
                console.log(e)
            }
        }
    }
},
})
