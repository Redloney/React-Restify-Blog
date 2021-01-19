import React from 'react'
import PropTypes from 'prop-types'

import { validate_user_exist, user_login } from '../../api/user'

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

  // 提交留言
  insertComment = (userinfo, comment) => {
    this.props.insertComment(userinfo, comment)
  }
  // 注销登录
  logout = () => {
    return () => {
      this.setState({
        userinfo: {
          logined: false
        }
      })
      // eslint-disable-next-line no-unused-expressions
      this.loginForm.current === null ? null : this.loginForm.current.resetFields()
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
      this.setState({
        model: {
          visible: true,
          confirmLoading: true,
        }
      })
      try {
        const userinfo = await this.loginForm.current.validateFields()
        console.log('userinfo', userinfo);
        // 验证格式成功设置输入框图标为通过
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
        // 发起登录请求，如用户存在则直接登录，否则创建新用户登录
        const info = await user_login(userinfo)
        console.log('info :', info);
        if (info.code) {
          this.setState({
            model: {
              visible: false,
              confirmLoading: false,
            },
            userinfo: {
              logined: true,
              ...info.userinfo
            }
          }, () => {
            this.loginForm.current.resetFields()
            message.success(info.msg)
          })
        }
      } catch (errorInfo) {
        console.log(errorInfo);
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

  // 取消
  handleCancel = () => {
    return () => {
      this.loginForm.current.resetFields()
      this.setState({
        nicknameExtra: false,
        model: {
          visible: false
        }
      })
    }
  }

  // // api 校验用户是否存在
  // validate_user_exist = (user) => {
  //   return new Promise((resolve, reject) => {
  //     user === 'jack' ? resolve(true) : resolve(false)
  //   })
  // }

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
              <Form.Item className={this.state.nicknameExtra ? 'm-b-0' : ''} name='nickname' extra={this.state.nicknameExtra} validateTrigger='onBlur' hasFeedback rules={[
                {
                  type: 'string',
                  required: true,
                  whitespace: true,
                  message: '请输入昵称！',
                },
                {
                  validator: async (rule, value, callback) => {
                    const isPass = await validate_user_exist(value)
                    console.log(isPass);
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
                <Input addonBefore='昵称(必填)' className='nickname' placeholder="xx" ref={this.nickname} value={this.state.nickname} onChange={this.nicknameChange()} onFocus={this.clearErrorMessages('nickname')} />
              </Form.Item>
              <Form.Item name='email' validateTrigger='onBlur' hasFeedback rules={[
                {
                  required: true,
                  message: '请输入邮箱！'
                }, {
                  type: 'email',
                  message: '邮箱格式必须正确！'
                }
              ]}>
                <Input addonBefore='邮箱(必填)' className='email' placeholder="xxx@xxx.xxx" ref={this.email} value={this.state.email} onChange={this.emailChange()} onFocus={this.clearErrorMessages('email')} />
              </Form.Item>
              <Form.Item name='pageUrl' validateTrigger='onBlur' hasFeedback rules={[
                {
                  required: false,
                  min: 6,
                  message: '网址格式不符合要求！',
                  type: 'url'
                }
              ]}>
                <Input addonBefore='主页(选填)' className='pageUrl' placeholder="http://xxx.xxx" ref={this.pageUrl} value={this.state.pageUrl} onChange={this.pageUrlChange()} onFocus={this.clearErrorMessages('pageUrl')} />
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