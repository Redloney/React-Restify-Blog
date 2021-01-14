import { combineReducers } from 'redux'

import user from './reducers/user'
import comment from './reducers/comment'

export default combineReducers({
    user,
    comment
})