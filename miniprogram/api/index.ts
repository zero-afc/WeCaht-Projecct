import { Request } from "./interface"

class RequestHttp {
  private config!: Request.Config
  constructor(config: Request.Config) {
    this.config = config
  }

  // 临时添加
  private requestInterceptor(options: Request.option) {
    const token = wx.getStorageSync("token")
    if (token) {
      options = { ...options, header: { Authorization: `Bearer ${token}`, ...options.header } }
    }
    return options
  }

  private sendRequest<T>(type: Request.Type, url: string, options: any = {}) {
    options = this.requestInterceptor(options)
    return new Promise<T>((resolve, reject) => {
      wx.request({
        method: type,
        url: this.config.baseURL + url,
        enableQuic: true,
        ...options,
        success: (res: any) => { resolve(res.data) },
        fail: (err) => { reject(err) }
      })
    })
  }

  // * 常用请求方法封装 >> url 请求地址 >> data 请求的参数 >> option 请求的其它配置
  get<T>(url: string, data?: object, option?: Request.option) {
    return this.sendRequest<T>("GET", url, { data, ...option })
  }
  post<T>(url: string, data?: object, option?: Request.option) {
    return this.sendRequest<T>("POST", url, { data, ...option })
  }
  put<T>(url: string, data?: object, option?: Request.option) {
    return this.sendRequest<T>("PUT", url, { data, ...option })
  }
}

export default new RequestHttp({
  baseURL: "https://live-api.itheima.net"
})
