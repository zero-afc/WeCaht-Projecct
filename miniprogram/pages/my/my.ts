// pages/my/my.ts
import { User } from "../../api/interface"
import { omitProperties, flatObject } from '../../utils/util'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    linkList: flatObject([
      { title: "我的房屋", url: "/pages/logs/logs", icon: "../../assets/images/我的房屋.png", text: "认证房屋" },
      { title: "我的保修", url: "/pages/logs/logs", icon: "../../assets/images/我的保修.png", text: "保修记录" },
      { title: "访客记录", url: "/pages/logs/logs", icon: "../../assets/images/访客记录.png", text: "访客记录" },
    ], "title"),
    infoData: {} as User.Info
  },

  // 去完善信息
  toPerfect() {
    if (app.globalData.token) {
      wx.navigateTo({ url: "./my-detail/my-detail" })
    } else {
      wx.navigateTo({ url: "/pages/logs/logs" })
    }
  },

  onSelect(e: any) {
    const token = wx.getStorageSync("token")
    if (token) {
      wx.navigateTo({
        url: "/pages/public-page/public-page",
        success: (res) => {
          const id = e.currentTarget.dataset.id
          res.eventChannel.emit('acceptDataFromOpenerPage', omitProperties(this.data.linkList[id], ["icon"]))
        }
      })
    } else {
      wx.navigateTo({ url: "/pages/logs/logs" })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const { token, userInfo } = app.globalData
    if (token) this.setData({ infoData: userInfo })
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