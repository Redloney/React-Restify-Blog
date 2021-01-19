import axios from '../utils/axios'
// import jsonp from 'jsonp'

// api 只管调接口传参数 其他的server端再处理

// 验证用户名是否存在
export const validate_user_exist = async (nickname) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/user/exist', { nickname }).then(res => {
            res.data.length === 0 ? resolve(false) : resolve(true)
        }).catch(err => {
            resolve(false)
        })
    })
}

// 用户登录 && 更新用户数据
export const user_login = async ({ nickname, email, pageUrl }) => {
    return new Promise((resolve, reject) => {
        if (window.user_address) {
            const { ad_info, ip, location } = window.user_address
            console.log('window.user_address : ', window.user_address)
            axios.post('/api/user/login', {
                nickname,
                email,
                pageUrl,
                address: {
                    ip,
                    ...ad_info,
                    location 
                }
            }).then(res => {
                console.log(res)
                resolve(res.data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
            console.log('用户&&地址添加成功')
        } else {
            axios.post('/api/user/login', {
                nickname,
                email,
                pageUrl
            }).then(res => {
                console.log(res)
                resolve(res.data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
            console.log('用户添加成功')
        }
    })
}

// 通过腾讯地图api获取ip地址
export const get_user_address = async () => {
    return new Promise((resolve, reject) => {
        axios({
                url: '/map',
                method: "GET",
                params: {
                    key: 'S6SBZ-I7LWR-JVPWP-W7SJK-OWEDT-GFBJS'
                }
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}