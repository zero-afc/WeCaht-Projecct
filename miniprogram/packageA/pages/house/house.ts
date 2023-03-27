// pages/house/house.ts
const QQMapWX = require("../../../libs/qqmap-wx-jssdk")
const qqmapsdk = new QQMapWX({ key: "5RSBZ-7CQ3J-NT3FC-XO556-BSE7J-HAB62" })

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    latitude: 0,
    longitude: 0,
    list: [] as any
  },

  search() {
    qqmapsdk.search({
      keyword: "小区",
      location: { longitude: this.data.longitude, latitude: this.data.latitude },
      success: (res: any) => {
        this.setData({ list: [...this.data.list, ...res.data] })
      }
    })
  },

  async chooseLocation() {
    let { address, latitude, longitude } = await wx.chooseLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude
    })
    // @ts-ignore
    this.setData({ address, latitude, longitude, list: [] })
    this.search()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const { latitude, longitude } = await wx.getLocation({ type: 'gcj02' })
    this.setData({ latitude, longitude })
    qqmapsdk.reverseGeocoder({
      location: { latitude, longitude },
      success: (res: any) => {
        this.setData({ address: res.result.address })
        this.search()
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})