import http from "../index"
import { User, ResultData } from "../interface"

/**
 * @description 获取验证码
 * @param data 
 */
export const sendCode = (data: { mobile: string }) => {
  return http.get<ResultData<User.Code>>("/code", data)
}

/**
 * @description 登录请求
 * @param data 
 */
export const sendLogin = (data: { mobile: string, code: string }) => {
  return http.post<ResultData<User.Token>>("/login", data)
}

/**
 * @description 获取用户信息
 * @param data 
 */
export const getUserInfo = () => {
  return http.get<ResultData<User.Info>>("/userInfo")
}

/**
 * @description 信息修改
 * @param data 
 */
export const updateUserInfo = (data: Pick<User.Info, "nickName">) => {
  return http.put<ResultData<Pick<User.Info, "id">>>("/userInfo", data)
}


