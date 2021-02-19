import axios from '../utils/axios'

export const validate_user_exist = (validate) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post('/api/user/validate', validate)
            data.code ? resolve(true) : resolve(false)
        } catch (err) {
            resolve(false)
        }
    })
}

export const user_login = ({ nickname, email, weburl }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (window.user_address) {
                const { ip, location, ad_info } = window.user_address
                const result = await axios.post('/api/user/login', {
                    nickname,
                    email,
                    weburl,
                    address: { ip, location, ...ad_info }
                })
                resolve({ ...result.data, isLogin: true })
            }
        } catch (err) {
            reject(err)
        }
    })
}

// 腾讯地图api
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