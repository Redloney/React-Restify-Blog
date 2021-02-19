import { SET_USERINFO, DEL_USERINFO } from '../constant'
import storage from '../../utils/storage'

const initState = () => {
    // 获取 local storage 缓存数据
    const userinfo = storage.get('userinfo')
    if (userinfo) {
        return { ...userinfo, isLogin: true }
    }
    return {}
}

export default function UserReducer (preState = initState(), action) {
    const { type, data } = action
    switch (type) {
        case SET_USERINFO:
            // 添加用户信息
            return { ...data.userinfo, isLogin: true }
        case DEL_USERINFO:
            // 删除用户信息,同时删除缓存的信息
            storage.del('userinfo')
            return {}
        default:
            return preState
    }
}