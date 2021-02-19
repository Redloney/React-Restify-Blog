import React, { PureComponent } from 'react'

import { validate_user_exist } from '../../api/user'

import { Button, Form, Input, Modal, Popconfirm, message, PageHeader } from 'antd'

import Comments from './Comments/Comments'

import './Editor.scss'

const { TextArea } = Input
class Editor extends PureComponent {

  loginForm = React.createRef()

  state = {
    nicknameExtra: false,
    emailExtra: false,
    replyId: '',
    inputBoxes: {
      nickname: '',
      email: '',
      weburl: '',
      comment: ''
    },
    model: {
      visible: false,
      confirmLoading: false
    }
  }

  comment = React.createRef()
  nickname = React.createRef()
  email = React.createRef()
  weburl = React.createRef()

  componentDidMount () {
  }

  controlInput = (name) => {
    return (e) => {
      this.setState({
        inputBoxes: {
          [name]: e.target.value
        }
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
  weburlChange = () => {
    return (e) => {
      this.setState({
        inputBoxes: { ...this.state.inputBoxes, weburl: e.target.value }
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

  clearErrorMessages = (name) => {
    return () => {
      this.loginForm.current.setFields([
        {
          name,
          errors: [],
          validateStatus: false
        }
      ])
    }
  }

  // actions

  // Modal
  showModal = () => {
    this.setState({
      model: {
        ...this.state.model,
        visible: true
      }
    })
  }

  replyTo = ({ v, fId }) => {
    console.log(v, fId);
    this.setState({
      inputBoxes: {
        ...this.state.inputBoxes,
        comment: `@${v.userinfo.nickname} : `
      },
      replyId: fId
    })
    this.comment.current.focus()
  }

  // 确认提交留言
  confirm_submit = () => {
    const content = this.state.inputBoxes.comment
    const replyId = this.state.replyId
    this.setState({
      inputBoxes: {
        comment: '',
        ...this.state.inputBoxes
      }
    })
    if (content.length < 5) {
      message.warning(' 提交失败、再多写一点吧')
      return
    }
    if (content.length > 150) {
      message.warning('提交失败、留言字数超出限制')
      return
    }
    this.props.insertComment({ content, replyId })
    this.setState({
      replyId: null,
      inputBoxes: {}
    })

  }

  // 取消提交留言
  cancel_submit = () => {
  }

  startLoading = () => {
    this.setState({
      model: {
        visible: true,
        confirmLoading: true,
      }
    })
  }

  loginSuccess = () => {
    this.setState({
      model: {
        visible: false,
        confirmLoading: false,
      }
    })
    this.loginForm.current.resetFields()
  }

  loginWrong = () => {
    this.setState({
      model: {
        visible: true,
        confirmLoading: false,
      }
    })
  }

  // 确定登录
  login = async () => {
    try {
      this.startLoading()
      const userinfo = await this.loginForm.current.validateFields()
      const isLogin = await this.props.login(userinfo)
      if (isLogin) this.loginSuccess()
      else this.loginWrong()
    } catch (err) {
      this.loginWrong()
    }
  }

  // 注销登录
  logout = () => {
    this.props.delUserInfo()
  }

  // 取消
  cancel = () => {
    this.loginForm.current.resetFields()
    this.setState({
      nicknameExtra: false,
      emailExtra: false,
      model: {
        visible: false
      }
    })
  }

  render () {

    const { nickname = '陌生人', isLogin = false } = this.props.userinfo

    const { visible, confirmLoading } = this.state.model

    let pageHeaderExtra = isLogin ?
      <Button onClick={this.logout} type='text'>注销</Button> :
      <Button onClick={this.showModal} type='text'>登录</Button>

    return (
      <>
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
              onOk={this.login}
              confirmLoading={confirmLoading}
              onCancel={this.cancel}
            >
              <Form name="user_register" ref={this.loginForm}
              // onFinish={(v) => console.log('提交成功', v)}
              // onFinishFailed={(v) => console.log('提交失败', v)}
              >
                <Form.Item className={this.state.nicknameExtra ? 'm-b-0' : ''} name='nickname' extra={this.state.nicknameExtra} validateTrigger='onBlur' hasFeedback rules={[
                  {
                    type: 'string',
                    required: true,
                    whitespace: true,
                    message: '请输入昵称！',
                  },
                  {
                    validator: async (rule, value, callback) => {
                      const isExist = await validate_user_exist({ nickname: value })
                      isExist ? this.setState({
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
                  <Input addonBefore='昵称(必填)' className='nickname' placeholder="xx" ref={this.nickname} value={this.state.nickname} onChange={this.nicknameChange()} onFocus={this.clearErrorMessages('nickname')} />
                </Form.Item>
                <Form.Item name='email' className={this.state.emailExtra ? 'm-b-0' : ''} extra={this.state.emailExtra} validateTrigger='onBlur' hasFeedback rules={[
                  {
                    required: true,
                    message: '请输入邮箱！',
                  },
                  {
                    type: 'email',
                    message: '邮箱格式必须正确！'
                  },
                  {
                    validator: async (rule, value, callback) => {
                      const isExist = await validate_user_exist({ email: value })
                      isExist ? this.setState({
                        emailExtra: '邮箱已存在，请输入昵称登录！'
                      }) : this.setState({
                        emailExtra: false
                      })
                    }
                  },
                ]}>
                  <Input addonBefore='邮箱(必填)' className='email' placeholder="xxx@xxx.xxx" ref={this.email} value={this.state.email} onChange={this.emailChange()} onFocus={this.clearErrorMessages('email')} />
                </Form.Item>
                <Form.Item name='weburl' validateTrigger='onBlur' hasFeedback rules={[
                  {
                    required: false,
                    min: 6,
                    message: '网址格式不符合要求！',
                    type: 'url'
                  }
                ]}>
                  <Input addonBefore='主页(选填)' className='weburl' placeholder="http://xxx.xxx" ref={this.weburl} value={this.state.weburl} onChange={this.weburlChange()} onFocus={this.clearErrorMessages('weburl')} />
                </Form.Item>
              </Form>

            </Modal>

            <PageHeader
              className="site-page-header"
              onBack={() => message.warn('返回上层！')}
              title="留言板"
              subTitle={`你好啊 ${nickname} , 欢迎给我留言 !`}
              extra={pageHeaderExtra}
            />

            <TextArea
              minLength={3}
              maxLength={300}
              showCount
              ref={this.comment}
              value={this.state.inputBoxes.comment}
              // onChange={this.commentChange()}
              onChange={this.controlInput('comment')}
              className='editor_input'
            />
            {
              isLogin &&
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
        <Comments
          userinfo={this.props.userinfo}
          comments={this.props.comments}
          deleteComment={this.props.deleteComment}
          getMore={this.props.getMore}
          replyTo={this.replyTo}
        />
      </>
    )
  }
}

export default Editor