import * as React from 'react';

// import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { _insert, _delete } from '../../redux/actions/user'
import Editor from '../../components/Editor/Editor'
import CommentLists from '../../components/Comments/Comments'
import { message, Tooltip } from 'antd'
import './Message.scss'

import moment from 'moment';
import 'moment/locale/zh-cn'

import storage from '../../utils/storage'

@connect(
  state => state,
  {
    _insert, _delete
  }
)

class MessageUI extends React.Component {

  state = {
    data: [
      {
        actions: [<span key="comment-list-reply-to">回复</span>],
        author: '小马',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().subtract(1, 'days').fromNow()}</span>
          </Tooltip>
        ),
      },
      {
        // actions: <span key="comment-list-reply-to-0">回复</span>,
        author: '小红',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().subtract(2, 'days').fromNow()}</span>
          </Tooltip>
        ),
      }
    ]
  }

  componentDidMount () {
    this.getMessage()
  }

  // 添加用户
  _insert = () => {
    return () => {
      this.props.insert({ name: this.state.name })
    }
  }

  // 注销用户
  _delete = (index) => {
    return () => {
      this.props._delete(index)
    }
  }

  // 添加留言
  insertComment = (userinfo, comment) => {
    message.success('添加留言');
    this.setState({
      data: [{
        _id: userinfo._id,
        author: userinfo.nickname,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            {comment}
          </p>
        ),
        datetime: (
          <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().subtract(2, 'days').fromNow()}</span>
          </Tooltip>
        )
      }, ...this.state.data]
    }, () => {
      message.success(' 提交成功、谢谢你的留言 ！ ')
    })
  }

  // 删除留言
  delComment = (id) => {
    console.log(id);
    this.setState({
      data: this.state.data.filter((value, index) => {
        return index !== id
      })
    }, () => {
      message.success('删除成功！')
    })
  }

  // 修改留言
  updateMessage = () => {
    message.success('修改留言');
  }

  // 获取留言 5条 挂载时获取
  getMessage = () => {
    message.success('获取留言');
  }

  // 获取更多留言 原5条基础上获取 
  getMore = () => {
    // message.success('获取跟多')
    this.setState({
      data: [...this.state.data,
      {
        // actions: <span key="comment-list-reply-to-0">回复</span>,
        author: '小红',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().subtract(2, 'days').fromNow()}</span>
          </Tooltip>
        ),
      },
      {
        // actions: <span key="comment-list-reply-to-0">回复</span>,
        author: '小红',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().subtract(2, 'days').fromNow()}</span>
          </Tooltip>
        ),
      },
      {
        // actions: <span key="comment-list-reply-to-0">回复</span>,
        author: '小红',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().subtract(2, 'days').fromNow()}</span>
          </Tooltip>
        ),
      },
      ]
    })
  }

  // 回复留言到 id
  replyTo = (id, comment) => {
    message.success(id + " " + comment)
  }

  render () {
    // 从 浏览器缓存中获取 没有就为空
    const userinfo = storage.get('userinfo') || {}
    console.log('浏览器缓存中:', userinfo);

    const {
      insertComment,
      delComment,
      updateMessage,
      getMore,
      replyTo } = this

    return (
      <div className="message">
        { /** 
         * 
         * 编辑器参数： userinfo {} ,  
         * 
         * */}
        <Editor userinfo={userinfo} insertComment={insertComment} updateMessage={updateMessage} />
        { /** 
         * 留言列表参数： lists [] ,
         *  留言列表组件只接受列表数组用来遍历渲染
         * */}
        <CommentLists data={this.state.data}
          delComment={delComment}
          getMore={getMore}
          replyTo={replyTo}
        />
      </div>
    )
  }
}

export default MessageUI

// export default connect(
//   // mapStateToProps
//   state => ({
//     user: state.user
//   }),
//   // mapDispatchToProps
//   {
//     _insert, _delete
//   }
// )(MessageUI)