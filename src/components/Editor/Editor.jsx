import React from 'react'
import PropTypes from 'prop-types'

import { Button, Form, Input, Modal, Popconfirm, message, PageHeader } from 'antd'
// import moment from 'moment';
// import 'moment/locale/zh-cn'

import './Editor.scss'

const { TextArea } = Input

class Editor extends React.Component {

  static stateTypes = {
    model: PropTypes.object,
    userInfo: PropTypes.object,
    inputBoxes: PropTypes.array
  }

  static propTypes = {
    userinfo: PropTypes.object
  }

  loginForm = React.createRef()

  state = {
    nicknameExtra: false,
    // 用户状态
    userinfo: {
      _id: '',
      nickname: '',
      logined: false
    },
    inputBoxes: {
      nickname: '',
      email: '',
      pageUrl: '',
      comment: ''
    },
    // 留言状态
    model: {
      visible: false,
      confirmLoading: false
    }
  }

  comment = React.createRef()
  nickname = React.createRef()
  email = React.createRef()
  pageUrl = React.createRef()

  componentDidMount () {
    // 初始化页面状态
    if (this.props.userinfo) {
      const { _id, nickname, email, pageUrl, logined, } = this.props.userinfo
      this.setState({
        userinfo: {
          _id,
          nickname,
          email,
          pageUrl,
          logined,
        }
      })
    } else {
      this.setState({
        logined: false
      })
    }
  }

  // 受控输入框
  nicknameChange = () => {
    return (e) => {
      this.setState({
        inputBoxes: { ...this.state.inputBoxes, nickname: e.target.value }
      })
    }
  }
  emailChange = () => {
    return (e) => {
      this.setState({
        inputBoxes: { ...this.state.inputBoxes, email: e.target.value }
      })
    }
  }
  pageUrlChange = () => {
    return (e) => {
      this.setState({
        inputBoxes: { ...this.state.inputBoxes, pageUrl: e.target.value }
      })
    }
  }
  commentChange = () => {
    return (e) => {
      this.setState({
        inputBoxes: { ...this.state.inputBoxes, comment: e.target.value }
      })
    }
  }

  // 提交留言
  insertComment = (userinfo, comment) => {
    this.props.insertComment(userinfo, comment)
  }
  // 若用户已登录
  logout = () => {
    return () => {
      this.setState({
        userinfo: {
          logined: false
        }
      })
      message.success('您已注销！')
    }
  }
  // Modal 事件 ------------
  showModal = () => {
    return () => {
      this.setState({
        model: {
          ...this.state.model,
          visible: true
        }
      })
    }
  }
  // 确认提交留言
  confirm_submit = () => {

    const { userinfo, inputBoxes } = this.state

    // const { _id, nickname, email, pageUrl } = userinfo

    const { comment } = inputBoxes

    const data = this.state.inputBoxes.comment

    if (data && data.length > 5) {
      this.insertComment(userinfo, comment)
    } else {
      message.warning(' 提交失败、再多写一点吧~  ')
    }
  }
  // 取消提交留言
  cancel_submit = () => {
  }

  // Comment 提交按钮事件

  // CommentFinish = comment => {
  //   const { userinfo , inputBoxes} = this.state
  //   console.log(userinfo.nickname + '评论了：' + inputBoxes.comment);
  // }

  // 确定提交
  handleOk = () => {
    return async () => {

      // 设置弹出框状态 此时已经点击了确定按钮，按钮需要触发动画
      this.setState({
        model: {
          visible: true,
          confirmLoading: true,
        }
      })

      try {
        const userinfo = await this.loginForm.current.validateFields()
        this.loginForm.current.setFields([
          {
            name: 'nickname',
            validateStatus: 'success'
          }, {
            name: 'email',
            validateStatus: 'success'
          }, {
            name: 'pageUrl',
            validateStatus: 'success'
          }
        ])
        // 获取用户信息成功后
        setTimeout(() => {
          this.setState({
            model: {
              visible: false,
              confirmLoading: false,
            },
            userinfo: {
              logined: true,
              _id: Math.random(1, 999),
              ...userinfo
            }
          }, () => {
            message.success('登录成功！')
          })
        }, 3000)
      } catch (errorInfo) {

        this.setState({
          model: {
            visible: true,
            confirmLoading: false,
          }
        })
        // console.log('Failed', errorInfo);
        message.warn('格式错误,请检查后重新提交！')
      }
    }
  }

  // registerFinish = () => {
  //   return () => {

  //   }
  // }

  // 取消
  handleCancel = () => {
    return () => {
      this.loginForm.current.resetFields()
      this.setState({
        model: {
          visible: false
        }
      })
    }
  }
  validate_user_exist = (user) => {
    return new Promise((resolve, reject) => {
      user === 'jack' ? resolve(true) : resolve(false)
    })
  }
  render () {
    // userinfo 登录凭证
    const { nickname, logined } = this.state.userinfo

    // model 参数
    const { visible, confirmLoading } = this.state.model

    // 评论底部操作栏
    let pageHeaderExtra = logined ?
      <Button onClick={this.logout()} type='text'>注销</Button> :
      <Button onClick={this.showModal()} type='text'>登录</Button>

    return (
      <section className="editor" data-aos='flip-down'
        data-aos-duration={800} >
        <div className="editor_wrapper">
          <Modal
            className="modal"
            centered
            title="登录"
            cancelText='取消'
            okText='确定'
            mask
            maskClosable
            visible={visible}
            onOk={this.handleOk()}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel()}
          >
            <Form name="user_register" ref={this.loginForm}
              onFinish={(v) => console.log('提交成功', v)}
              onFinishFailed={(v) => console.log('提交失败', v)}>
              <Form.Item name='nickname' help={this.state.nicknameExtra} hasFeedback rules={[
                {
                  type: 'string',
                  required: true,
                  whitespace: true,
                  message: '请输入昵称！',
                },
                {
                  validator: async (rule, value, callback) => {
                    const isPass = await this.validate_user_exist(value)
                    isPass ? this.setState({
                      nicknameExtra: '昵称已存在，请输入邮箱登录！'
                    }) : this.setState({
                      nicknameExtra: false
                    })
                  }
                },
                {
                  min: 1,
                  max: 16,
                  message: '昵称长度必须在1-16位之间！'
                }
              ]} >
                <Input addonBefore='昵称(必填)' className='nickname' placeholder="xx" ref={this.nickname} value={this.state.nickname} onChange={this.nicknameChange()} />
              </Form.Item>
              <Form.Item name='email' hasFeedback rules={[
                {
                  required: true,
                  message: '请输入邮箱！'
                }, {
                  type: 'email',
                  message: '邮箱格式必须正确！'
                }
              ]}>
                <Input addonBefore='邮箱(必填)' className='email' placeholder="xxx@xxx.xxx" ref={this.email} value={this.state.email} onChange={this.emailChange()} />
              </Form.Item>
              <Form.Item name='pageUrl' hasFeedback rules={[
                {
                  required: false,
                  min: 6,
                  message: '网址格式不符合要求！',
                  type: 'url'
                }
              ]}>
                <Input addonBefore='主页(选填)' className='pageUrl' placeholder="http://xxx.xxx" ref={this.pageUrl} value={this.state.pageUrl} onChange={this.pageUrlChange()} />
              </Form.Item>
              {/* <Form.Item>
                <Button type='primary' htmlType='submit'>提交</Button>
              </Form.Item> */}
            </Form>

          </Modal>

          <PageHeader
            className="site-page-header"
            onBack={() => message.warn('返回上层！')}
            title="留言板"
            subTitle={`你好啊~ ${nickname ? nickname : '陌生人'} , 欢迎给我留言~`}
            extra={pageHeaderExtra}
          />

          <TextArea
            value={this.state.inputBoxes.comment}
            onChange={this.commentChange()}
            className='editor_input'
          />

          {
            logined &&
            (<div className="button_groups">
              <Popconfirm
                className="popconfirm"
                title="你确定要提交么?"
                placement='topRight'
                onConfirm={this.confirm_submit}
                onCancel={this.cancel_submit}
                okText="确定" cancelText="取消">
                <Button className='submit' type='default'>确定</Button>
              </Popconfirm>
            </div>)
          }
        </div>
      </section>
    )
  }
}

export default Editor