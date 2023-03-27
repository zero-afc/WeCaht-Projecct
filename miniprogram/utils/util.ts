// 图片缓存
export function loadImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 先从本地缓存中获取图片
    wx.getStorage({
      key: imageUrl,
      success(res) {
        // 如果本地缓存中存在，则直接使用
        resolve(res.data);
      },
      fail() {
        // 如果本地缓存中不存在，则从网络地址下载并缓存到本地
        wx.downloadFile({
          url: imageUrl,
          success(res) {
            const tempFilePath = res.tempFilePath;
            // 缓存到本地
            wx.setStorage({
              key: imageUrl,
              data: tempFilePath,
              success() {
                wx.removeStorageSync(wx.getStorageSync("oldKey")) // 删除之前的数据
                resolve(tempFilePath);
                wx.setStorageSync("oldKey", imageUrl)
              },
              fail() {
                reject(new Error('Failed to cache image'));
              },
            });
          },
          fail() {
            reject(new Error('Failed to download image'));
          },
        });
      },
    });
  });
}

/**
 * @description 对目标对象进行属性过滤
 * @param target 目标对象
 * @param keyList 过滤属性列表
 * @returns 返回一个新对象
 */
export function omitProperties<T extends object, K extends keyof T>(target: T, keyList: K[]) {
  const newObj = {} as Omit<T, K>
  Object.keys(target).forEach(key => {
    if (!keyList.includes(key as K)) {
      // @ts-ignore
      newObj[key] = target[key]
    }
  })
  return newObj
}

export function flatObject<T extends object>(target: Array<T>, key: keyof T) {
  const newObj = {} as Record<string, T>
  target.forEach(item => {
    const k: any = item[key]
    newObj[k] = item
  })
  return newObj
}

