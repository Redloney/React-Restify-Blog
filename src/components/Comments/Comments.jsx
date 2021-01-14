import * as React from 'react'
import './Comments.scss'

import { Comment, List, Popconfirm, Button } from 'antd';

// import List from './List/List'

export default class Comments extends React.PureComponent {

  // 组件挂载
  componentDidMount () {
  }
  // 删除留言
  delComment = (id) => {
    return () => {
      this.props.delComment(id)
    }
  }
  // 回复留言
  replyTo = (id, comment) => {
    return () => {
      this.props.replyTo(id, comment)
      // this.props.replyTo(value,id)
    }
  }
  // 获取更多留言
  getMore () {
    return () => {
      this.props.getMore()
    }
  }
  // 渲染
  render () {

    // 操作栏功能
    let actions = ({ _id, nickname }) => {
      let arr = [
        <span key="comment-list-reply-to" onClick={this.replyTo(_id, '汪汪汪~' + nickname)}>回复</span>,
      ]
      if (_id) {
        return [...arr, <Popconfirm
          title="是否要删除此条留言?"
          okText="确定"
          onConfirm={this.delComment(_id)}
          cancelText="取消">
          <span className="del">删除</span>
        </Popconfirm>]
      }
      return arr
    }

    // List 渲染函数
    let renderItem = () => {
      return (comment, index) => (
        <List.Item data-aos='fade-up' data-aos-delay={index * 10} data-aos-duration={850}>
          <small>{index + 1}楼</small>
          <Comment
            actions={actions({ _id: 4325, nickname: '张三' })}
            author={comment.author}
            avatar={comment.avatar}
            content={comment.content}
            datetime={comment.datetime}>
          </Comment>
        </List.Item>
      )
    }

    // 加载更多
    let loadMore = (
      <div className="more" data-aos='fade-up' data-aos-duration={850} data-aos-easing="ease-in-out-back" style={{ padding: '20px 0', textAlign: 'center' }}>
        <Button onClick={this.getMore()}>更多留言</Button>
      </div>
    )

    return (
      <section className='comments' data-aos='fade-up'
        data-aos-duration={800} >
        <div className="changeListOrder">
          <Button type='text' size='small'>时间</Button>
          /
          <Button type='text' size='small'>点赞</Button>
        </div>
        <List
          className="comment-list"
          itemLayout="horizontal"
          size="small"
          split
          loadMore={loadMore}
          dataSource={this.props.data}
          renderItem={renderItem()}
        />
      </section >
    )
  }
}