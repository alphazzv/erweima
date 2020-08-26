const api = require('../../../config/api.js');
Page({
  data:{
      detailgood:{},
 hotgoods:[
      {
        "more_pic":"http://img10.yiguoimg.com/e/ad/2016/161008/585749449862226248_778x303.jpg"
      }
    ],
  },
  onLoad: function (options) 
  {
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
    for (var i in this.data.listgood){
       
        if(this.data.listgood[i].id == e.target.id){
            
            this.data.listgood[i].num = 1;
      
            var arc = wx.getStorageSync('cartt') || [];
    
            if(arc.length>0){
                for(var j in arc){
                
                    if(arc[j].id == e.target.id){
                      
                        arc[j].num = arc[j].num + 1;
                        
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
                wx.showToast({
                  title: '已加入购物车',
                  icon:"success",
                  duration:3000
                })
            }
            
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
