const api = require('../../../config/api.js');
var app = getApp()
/*商品信息*/
Page({
  data:{
    current: 0,

  category: [
    // {name:'产地a',cd:'111',image:'http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg',
//     {name:'b',id:'222',image:'http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg'},
    {name:'c',id:'333',image:''},
//     {name:'d',id:'444',image:''},
//     {name:'e',id:'555',image:''},
//     {name:'f',id:'666',image:''}
],
curIndex:0,
toView:0,
},
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },
  switchTab(e){
      this.setData({
        curIndex: e.currentTarget.dataset.index?e.currentTarget.dataset.index:0,
      toView:e.currentTarget.dataset.index,
      })
      console.log(category)
      
  },
    //ajax请求数据
    getData: function ()
    {
       var that = this;
       wx.request({ 
      url: api.Category,
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res)
       {
          console.log(res.data.data);
            that.setData
          ({
             category:res.data.data,
            });     
          },
       },
       )},
  
  
 
  //详情页跳转
  lookdetail:function(e){
    var lookid=e.currentTarget.dataset;
    wx.navigateTo({
      url:"/pages/yiwuyima/detail/detail?id="+lookid.id
    })

  },
  switchSlider:function(e){
    this.setData({
      current:e.target.dataset.index
    })
  },
  changeSlider:function(e){
    this.setData({
      current: e.detail.current
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onLoad:function(){
    // 页面显示
    this.getData()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

})
