import axios from '../utils/axios'

export const getComments = (page = 0, size = 15, sorter = 'createdAt', obj = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get('/api/comment/comments', { page, size, sorter, ...obj })
            resolve(result.data)
        } catch (err) {
            resolve([])
        }
    })
}

export const insertComment = ({ _id, content, replyId, address }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post('/api/comment/insert', { _id, content, replyId, address })
            result.data.code ? resolve(true) : resolve(false)
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteComment = (uId, _id, fId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post('/api/comment/delete', { uId, _id, fId })
            result.data.code ? resolve(true) : resolve(false)
        } catch (err) {
            reject(err)
        }
    })
}