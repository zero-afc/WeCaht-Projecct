// 响应体的一级数据类型
export interface BaseData<T> {
  cookies: Array<string>
  data: ResultData<T>
  errMsg: string
  header: any
  statusCode: number
}

// * 请求响应参数(不包含data)
export interface Result {
  code: number;
  message: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data: T;
}

// * 请求类
export namespace Request {
  export type Type = '' | 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
  export interface Config {
    baseURL: string
  }
  export type option = Partial<{
    data: object
    header: object
    timeout: number
    dataType: string
    responseType: string
    complete: () => void
  }>
}

// 社区
export namespace Community {
  export type DataType = {
    id: string
    title: string
    content: string
    createdAt: string
    creatorName: string
  }
}

// 用户
export namespace User {
  export interface Code {
    code: string
  }
  export interface Token {
    token: string
    refreshToken: string
  }
  export interface Info {
    id: string
    avatar: string
    nickName: string
  }
  export interface File {
    id: string
    url: string
  }
}

// 房屋
export namespace House {
  export interface DataType {
    id: string,
    point: string,
    building: string,
    room: string,
    name: string,
    gender: number,
    mobile: string,
    status: number
  }
  export interface Details extends DataType {
    idcardFrontUrl: string
    idcardBackUrl: string
  }
}


// 保修
export namespace Warranty {
  export interface DataType {

  }
}