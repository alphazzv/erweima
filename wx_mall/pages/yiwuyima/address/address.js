const app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {

          addresses: []

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = wx.getStorageSync('addresses') || [];
    // 更新数据  
    this.setData({
      addresses: arr
    });
  },
  onShow: function () {
    this.onLoad();
  },
  delAddress: function (e) {
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
  },
wxaddress: function () {
    wx.chooseAddress({
      success: function (res) {

          var name = res.userName;
          var phone = res.telNumber;
          var province = res.provinceName;
          var city = res.cityName;
          var detailInfo = res.detailInfo;  
          var arr = wx.getStorageSync('addresses') || [];
          var addresses = {
            name: name,
            phone: phone,
            address: province+city,
            detailInfo: detailInfo
          }
            arr.push(addresses);
          wx.setStorageSync('addresses', arr);
          console.log(arr.length)
        }
      })
    },
  })