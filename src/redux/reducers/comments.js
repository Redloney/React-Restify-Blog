import { SET_COMMENTS, DEL_COMMENT } from '../constant'

const initState = []

export default function Comments(preState = initState, actions) {
    let { type, data } = actions
    switch (type) {
        case SET_COMMENTS:
            return [...data.comments]
        case DEL_COMMENT:
            return [...preState.reduce((v) => v._id !== data._id)]
        default:
            return preState
    }
}