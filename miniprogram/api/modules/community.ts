import http from "../index"
import { Community, ResultData } from "../interface"

/**
 * @description 获取社区公告列表
 */
export const getCommunityList = () => {
  return http.get<ResultData<Community.DataType[]>>("/announcement")
}

/**
 * @description 获取社区公告详情
 * @param data 
 */
export const getCommunityDetails = (data: { id: string }) => {
  return http.get<ResultData<Community.DataType>>("/announcement/" + data.id)
}