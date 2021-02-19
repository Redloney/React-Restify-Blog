import { SET_COMMENTS, DEL_COMMENT } from '../constant'

export const setComments = comments => ({
    type: SET_COMMENTS,
    data: { comments }
})

export const deleteComment = _id => ({
    type: DEL_COMMENT,
    data: { _id }
})