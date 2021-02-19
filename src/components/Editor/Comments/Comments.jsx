/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react'

import { Comment, List, Tooltip, Popconfirm, Button, Skeleton, Avatar } from 'antd';

import dayjs from '../../../utils/dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

import './Comments.scss'

import randomColor from 'randomcolor'

dayjs.extend(relativeTime)

export default class Comments extends PureComponent {

  // 组件挂载
  componentDidMount () {
  }
  // 删除留言
  deleteComment = (uId, _id, fId) => {
    return () => {
      this.props.deleteComment(uId, _id, fId)
    }
  }
  // 回复留言
  replyTo = ({ v, fId }) => {
    return () => {
      this.props.replyTo({ v, fId })
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
    const { _id } = this.props.userinfo
    const actions = (v, fId) => {
      let actions = [<span key="comment-list-reply-to" onClick={this.replyTo({ v, fId })}>回复</span>]
      let del = (
        <Popconfirm title="是否要删除此条留言?"
          okText="确定"
          onConfirm={this.deleteComment(_id, v._id, fId)}
          cancelText="取消">
          <span className="del">删除</span>
        </Popconfirm>
      )
      // 如若评论用户正当前用户便向其开放删除功能
      v.userinfo._id === _id ? actions.push(del) : null
      return actions
    }


    const comment = (v, children, fId) => {
      const { userinfo, content, createdAt } = v
      const { nickname, weburl } = userinfo
      const datetime = (
        <Tooltip title={dayjs(createdAt).fromNow()}>
          <span>{dayjs(createdAt).fromNow()}</span>
        </Tooltip>
      )
      const avatar = (
        !weburl ? <Avatar style={{ backgroundColor: randomColor(), cursor: 'default' }}>
          {nickname.substr(0, 1).toUpperCase()}
        </Avatar> :
          <a href={weburl} title={weburl} target="_blank" rel="noopener noreferrer">
            <Avatar style={{ backgroundColor: randomColor(), cursor: 'pointer' }}>
              {nickname.substr(0, 1).toUpperCase()}
            </Avatar>
          </a>
      )
      return (
        <Comment
          key={v._id}
          author={nickname}
          actions={actions(v, fId)}
          avatar={avatar}
          content={(<div className='content' dangerouslySetInnerHTML={{ __html: content }}></div>)}
          datetime={datetime}>
          {
            children ?
              children.map((v, index) => {
                return comment(v, v.children, fId)
              })
              : null
          }
        </Comment>
      )
    }

    // 遍历评论列表
    const mapComments = (v, index) => {
      return (
        <List.Item key={v._id} data-aos='fade-up' data-aos-delay={index * 10} data-aos-duration={850}>
          <small>{this.props.comments.length - index}楼</small>
          {/* 传入 自己 自己的子评论 自己的id */}
          { comment(v, v.children, v._id)}
        </List.Item>
      )
    }

    // 加载更多
    const loadMore = (
      <div className="more"
        data-aos='fade-up'
        data-aos-duration={850}
        data-aos-easing="ease-in-out-back"
        style={{ padding: '20px 0', textAlign: 'center' }}>
        <Button onClick={this.getMore()}>更多留言</Button>
      </div>
    )

    const comment_lists = (
      <List
        className="comment-list"
        itemLayout="horizontal"
        size="small"
        split
        loadMore={loadMore}
        dataSource={this.props.comments}
        renderItem={mapComments}
      />
    )

    const none = [
      <List.Item key={1} data-aos='fade-up' data-aos-delay={1 * 10} data-aos-duration={850}>
        <Skeleton avatar title active />
      </List.Item>,
      <List.Item key={2} data-aos='fade-up' data-aos-delay={2 * 10} data-aos-duration={850}>
        <Skeleton avatar title active />
      </List.Item>,
      <List.Item key={3} data-aos='fade-up' data-aos-delay={3 * 10} data-aos-duration={850}>
        <Skeleton avatar title active />
      </List.Item>,
    ]


    return (
      <section className='comments' data-aos='fade-up' data-aos-duration={800}>
        <div className="changeListOrder">
          <Button type='text' size='small'>时间</Button> / <Button type='text' size='small'>点赞</Button>
        </div>
        {this.props.comments.length > 0 ? comment_lists : none}
      </section >
    )
  }
}