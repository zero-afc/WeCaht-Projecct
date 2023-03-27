// index.ts
import { getCommunityList } from "../../api/modules/community"
import { Community } from "../../api/interface"
// const app = getApp<IAppOption>()

Page({
  data: {
    TopMenus: [
      { text: "我的房屋", img: "../../assets/images/在线报修@1x.png" },
      { text: "在线保修", img: "../../assets/images/在线报修@1x.png" },
      { text: "访客邀请", img: "../../assets/images/在线报修@1x.png" }
    ],
    list: [] as Array<Community.DataType>
  },

  toDetail(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  async onLoad() {
    const { data } = await getCommunityList()
    this.setData({
      TopMenus: this.data.TopMenus,
      list: data
    })

  }
})
