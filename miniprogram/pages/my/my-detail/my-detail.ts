// pages/my/my-detail/my-detail.ts
import { updateUserInfo } from '../../../api/modules/userInfo'
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp<IAppOption>()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "",
    nickName: "",
    show: false,
    actions: [
      { name: "用微信头像", avatar: true },
      { name: "从相册选择" },
      { name: "拍照" }
    ],
  },

  onBlur(e: any) {
    this.setData({ nickName: e.detail.value })
  },

  onClose() {
    this.setData({ show: false })
  },

  handleShow() {
    this.setData({ show: true })
  },

  onSelect(e: any) {
    const index = e.currentTarget.dataset.index
    switch (index) {
      case 0:
        this.selectWeChat()
        break;
      case 1:
        this.selectPhotosOrPhotograph("album")
        break;
      case 2:
        this.selectPhotosOrPhotograph("camera")
        break;
      default:
        break;
    }
    this.onClose()
  },

  // 用微信头像
  selectWeChat() {
    wx.getUserProfile({
      desc: "获取用户信息",
      success: async (res) => {
        try {
          this.setData({ avatar: res.userInfo.avatarUrl })
        } catch (error) {
          console.log(error);
        }
      }
    })
  },

  // 从相册选择 or 拍照
  selectPhotosOrPhotograph(option: "album" | "camera") {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: [option], // 相册, 拍照
      maxDuration: 30,
      camera: 'back',
      success: async (res) => {
        try {
          this.setData({ avatar: res.tempFiles[0].tempFilePath })
        } catch (error) {
          console.log(error);
        }
      }
    })
  },

  // 将图片上传到服务器
  uploadToServer(tempFilePath: string) {
    const token = wx.getStorageSync("token")
    if (!token) return new Promise(() => { })
    console.log(tempFilePath);
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'https://live-api.itheima.net/upload',
        filePath: tempFilePath,
        name: 'file',
        header: { Authorization: `Bearer ${token}` },
        formData: { type: 'avatar' },
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          reject(res.errMsg)
        }
      })
    })
  },

  // 确定处理程序
  async onSubmit() {
    try {
      Toast.loading({ duration: 0, message: '上传中...' });
      await Promise.all([
        updateUserInfo({ nickName: this.data.nickName }),
        this.uploadToServer(this.data.avatar)
      ])
      await app.initData()
      Toast.success("修改成功")
    } catch (error) {
      Toast.fail(error)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const { userInfo } = app.globalData
    this.setData({ nickName: userInfo?.nickName, avatar: userInfo?.avatar })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady() {

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