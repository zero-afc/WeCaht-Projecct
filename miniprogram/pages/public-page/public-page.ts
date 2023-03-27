// pages/public-page/public-page.ts
import { getHouseList } from '../../api/modules/house'

const { HOUSE, WARRANTY, CALLER } = (() => {
  enum TitleId {
    HOUSE = "我的房屋",
    WARRANTY = "我的保修",
    CALLER = "访客记录"
  }
  return TitleId
})()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: {} as Record<string, any>,
    list: []
  },

  async initData(id: string) {
    let result = null
    switch (id) {
      case HOUSE:
        result = await getHouseList()
        break;
      case WARRANTY:
        result = await getHouseList()
        break;
      case CALLER:
        result = await getHouseList()
        break;
      default:
        break;
    }
    console.log(result);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (state) => {
      this.setData({ state })
    })
    const title = this.data.state.title
    wx.setNavigationBarTitle({ title })
    this.initData(title)
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