import { INSERT, DELETE, UPDATE, } from '../constant'

const initState = [{ name: '法外狂徒' }, { name: '张三' }]

export default function UserReducer(preState = initState, action) {

    const { type, data } = action

    switch (type) {
        case INSERT:
            return [data, ...preState]
        case DELETE:
            return preState.filter((user, index) => index !== data)
        case UPDATE:
            return preState
            // return preState.map((user, index) => {
            //     if (user._id === data.id) {
            //         return data
            //     }
            //     return user
            // })
        default:
            return preState
    }

}