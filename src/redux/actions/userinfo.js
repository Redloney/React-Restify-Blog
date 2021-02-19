import { SET_USERINFO, DEL_USERINFO } from '../constant'

// 登录
export const setUserInfo = userinfo => ({ type: SET_USERINFO, data: { userinfo } })

// 注销
export const delUserInfo = () => ({ type: DEL_USERINFO, data: {} })