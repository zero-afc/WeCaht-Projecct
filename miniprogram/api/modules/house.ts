import http from "../index"
import { House, ResultData } from "../interface"

/**
 * @description 获取我的房屋列表
 */
export const getHouseList = () => {
  return http.get<ResultData<House.DataType>>("/room", {}, {
    header: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

/**
 * @description 获取我的房屋详情
 */
export const getHouseDetails = (id: string) => {
  return http.get<ResultData<House.Details>>("/room/" + id, {}, {
    header: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

/**
 * @description 添加、编辑房屋
 * @param data 
 */
export const getHouseEditOrDel = (data: Omit<House.Details, "status">) => {
  return http.post<ResultData<Pick<House.DataType, "id">>>("/room", data)
}