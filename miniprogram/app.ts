import { getUserInfo, refreshToken } from "./api/modules/userInfo"
import { loadImage } from "./utils/util"

// app.ts
App<IAppOption>({
  globalData: {
    userInfo: null,
    token: ""
  },
  initData() {
    // 等待数据加载完成后再执行后续操作
    return new Promise<void>(async (resolve, reject) => {
      try {
        const token = wx.getStorageSync("token")
        if (!token) return reject()
        const result = await getUserInfo()
        if (result.code === 401) {
          // 处理token过期
          const { data } = await refreshToken(wx.getStorageSync("refreshToken"))
          wx.setStorageSync('token', data.token);
          wx.setStorageSync('refreshToken', data.refreshToken);
          this.initData()
          return
        }
        const avatar = await loadImage(result.data.avatar)
        this.globalData.userInfo = { ...result.data, avatar }
        this.globalData.token = token
        resolve()
      } catch (error) {
        console.log(error);
      }
    })
  },
  async onLaunch() {
    try {
      await this.initData()
    } catch (error) { }
  },
})