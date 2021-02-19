import { combineReducers } from 'redux'

import userinfo from './reducers/userinfo'
import comments from './reducers/comments'

export default combineReducers({
    userinfo,
    comments
})