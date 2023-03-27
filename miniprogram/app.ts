import { getUserInfo } from "./api/modules/userInfo"
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
      const token = wx.getStorageSync("token")
      if (token) {
        const { data } = await getUserInfo()
        const avatar = await loadImage(data.avatar)
        this.globalData.userInfo = { ...data, avatar }
        this.globalData.token = token
        resolve()
      } else reject()
    })
  },
  async onLaunch() {
    try {
      await this.initData()
    } catch (error) { }
  },
})