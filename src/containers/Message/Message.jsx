import * as React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'

import Editor from '../../components/Editor/Editor'
// user action creator
import { setUserInfo, delUserInfo } from '../../redux/actions/userinfo'
// comment action creator
import { setComments } from '../../redux/actions/comment'
// comment api 
import { getComments, insertComment, deleteComment } from '../../api/comment'

import { user_login } from '../../api/user'

import storage from '../../utils/storage'

import './Message.scss'

// import storage from '../../utils/storage'
@connect(
  state => state, { setUserInfo, delUserInfo, setComments }
)

class MessageUI extends React.Component {

  componentDidMount () {
    this.init_redux_state()
  }

  init_redux_state = async () => {
    try {
      console.log('init')
      const { comments, code } = await getComments()
      this.props.setComments(code ? comments : [])
    } catch (err) {
      console.warn(err)
    }
  }

  login = async (userinfo) => {
    try {
      const { user, token, iat, exp, code, msg } = await user_login(userinfo)
      if (code) {
        this.props.setUserInfo({ ...user, token, iat, exp })
        storage.set('userinfo', { ...user, token, iat, exp })
        message.success(msg)
        return true
      }
      message.warn(msg)
      return false
    } catch (err) {
      console.log(err)
      // message.success(err)
      return false
    }
  }

  // User Reducer event
  setUserInfo = userinfo => {
    // redux 存用户信息
    let result = this.props.setUserInfo(userinfo)
    console.log('setUserInfo', result)
    this.setState({
      userinfo: {
        isLogin: true
      }
    }, () => {
      storage.set('userinfo', this.state.userinfo)
      console.log('处理后：', this.state.userinfo)
    })
  }

  delUserInfo = () => {
    // redux 删除用户信息
    let result = this.props.delUserInfo()
    console.log('delUserInfo', result)
    this.setState({
      userinfo: {}
    })
  }

  // Component event

  // 添加留言
  insertComment = async ({ content, replyId }) => {
    try {
      const _id = this.props.userinfo._id
      const { ip, location, ad_info } = window.user_address
      const address = { ip, location, ...ad_info }
      const isInsert = await insertComment({ _id, content, replyId, address })
      if (isInsert) {
        message.success('留言成功!')
        this.init_redux_state()
      } else {
        message.error('留言失败!')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  // 删除留言
  deleteComment = async (uId, _id, fId) => {
    try {
      const isDel = await deleteComment(uId, _id, fId)
      if (isDel) {
        message.success('删除成功!')
        this.init_redux_state()
      } else {
        message.error('删除失败!')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  // 修改留言
  updateComment = () => {
    // message.success('修改留言')
  }

  // 获取留言 5条 挂载时获取
  fetchComment = () => {
    // message.success('获取留言')
  }

  // 获取更多留言 原5条基础上获取 
  getMore = () => {
    // message.success('获取跟多')
  }

  render () {

    const { insertComment, deleteComment, updateComment, setUserInfo, delUserInfo, getMore, replyTo, login } = this

    return (
      <div className="message">
        <Editor
          userinfo={this.props.userinfo}
          comments={this.props.comments}
          insertComment={insertComment}
          updateComment={updateComment}
          deleteComment={deleteComment}
          setUserInfo={setUserInfo}
          delUserInfo={delUserInfo}
          getMore={getMore}
          replyTo={replyTo}
          login={login}
        />
      </div>
    )
  }
}

export default MessageUI