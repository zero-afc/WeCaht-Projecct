/// <reference path="./types/index.d.ts" />
interface IAppOption {
  globalData: {
    userInfo: { avatar: string; id: string; nickName: string; } | null
    token: string
  }
  initData: () => void
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
