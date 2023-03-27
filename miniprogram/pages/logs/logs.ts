// logs.ts
import { sendCode, sendLogin } from "../../api/modules/userInfo"
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp<IAppOption>()
Page({
  data: {
    timer: 0,
    form: {
      mobile: "",
      code: ""
    }
  },

  validatePhone(phone: string) {
    const reg = /^1[3456789]\d{9}$/;
    return reg.test(phone);
  },

  onPhoneInput(e: any) {
    this.setData({
      ...this.data,
      form: { ...this.data.form, mobile: e.detail.value }
    })
  },

  onCodeInput(e: any) {
    this.setData({
      ...this.data,
      form: { ...this.data.form, code: e.detail.value }
    })
  },

  getAuthCode() {
    if (this.data.timer > 0) return
    if (!this.validatePhone(this.data.form.mobile)) {
      Toast.fail('不合法输入');
      return
    }

    let num = 60
    let time = setInterval(() => {
      this.setData({
        timer: num--
      })
      if (num < 0) clearInterval(time)
    }, 1000)
    // 请求响应太快了，让它慢一点
    setTimeout(async () => {
      const { data: { code } } = await sendCode({ mobile: this.data.form.mobile })
      if (code) {
        this.setData({ form: { ...this.data.form, code } })
      }
    }, 3000);
  },

  async onSubmit() {
    if (!this.validatePhone(this.data.form.mobile) || !this.data.form.code) {
      Toast.fail('输入有误');
      return
    }
    const { data } = await sendLogin({ ...this.data.form })
    if (data.token) {
      wx.setStorageSync('token', data.token);
      Toast.loading({ duration: 0, message: '正在拼命加载', forbidClick: true });
      await app.initData()
      Toast.clear()
      wx.navigateBack({ delta: 1 })
    }
  },

  async onLoad() {

  },
})