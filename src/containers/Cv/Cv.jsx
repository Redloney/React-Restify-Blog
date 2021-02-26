import * as React from 'react';
import './Cv.scss'
import { Row, Col } from 'antd'

const Cv = () => {
  return (
    <main className="cv">
      <section className='section'
        data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">个人信息</h2>
        <Row>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>乐文俊 - 男 - 22</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>湖北生物科技职业学院 - 计应</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>前端开发 - 1年工作经验</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>期望职位: Web前端开发</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>期望城市: 武汉</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>薪资 : 面议</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}><a href="https://gitee.com/redloney" target='_blank' rel="noreferrer">Gitee: https://gitee.com/redloney</a></Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}><a href="https://www.redloney.cn" target='_blank' rel="noreferrer">website : https://www.redloney.cn</a></Col>
        </Row>
      </section>
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">联系方式</h2>
        <Row>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={8} md={8} lg={8} xl={8} span={8}>
            手机 : 18030842838
            </Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={8} md={8} lg={8} xl={8} span={8}>
            邮箱 : 67591500@qq.com
            </Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={8} md={8} lg={8} xl={8} span={8}>
            网站 : www.redloney.cn
            </Col>
        </Row>
      </section>
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">开源项目</h2>
        <Row>
          <Col span={24}>
            个人博客：React + Redux + Antd + Restify + MongoDB  ( 简历，文章，留言板 )</Col>
        </Row>
      </section>
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">技能掌握</h2>
        <Row>
          <Col>
            <span className="dot"> ● </span>
            熟练使用 JS/Css/Html开发web应用，熟悉 ES6基本语法，了解 TypeScript 的基本使用
          </Col>
          <Col>
            <span className="dot"> ● </span>
            掌握 Vue React 的基本使用，能够独立开发 SPA 应用，熟悉组件化开发及构建优化
          </Col>
          <Col>
            <span className="dot"> ● </span>
            了解 NodeJS Restify 数据库熟悉 MongoDB ，能够使用NodeJs开发服务端应用
          </Col>
          <Col>
            <span className="dot"> ● </span>
            了解 小程序，有小程序页面开发经验，持续学习中
          </Col>
          <Col>
            <span className="dot"> ● </span>
            有过 C# 和 .Net 的开发经验 熟悉 SQL Server 数据库的基本使用
          </Col>
        </Row>
      </section>
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">工作经验</h2>
        <Row>
          <Col span={24}>
            <p className="company">武汉斑马快跑公司 (2019.8 - 2020.2)</p>
            <p className="job-title">研发部/前端开发实习</p>
            <p><span className="dot"> ● </span>负责参与公司官网的重构项目</p>
            <p><span className="dot"> ● </span>公司业务与活动静态页面与数据交互</p>
            <p><span className="dot"> ● </span>静态网页PC端，移动端各浏览器兼容适配</p>
          </Col>
        </Row>
      </section>
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">项目经验</h2>
        <Row>
          <Col>
            <h4 className='f-w-900'>斑马公司官网</h4>
            <p><strong>概述：</strong>基于原项目的基础上使用Vue重新编写整个项目</p>
            <p><strong>角色：</strong>独立前端设计与开发，定期汇报开发进度</p>
            <p><strong>职责：</strong>负责项目架构，技术选型，参与开发与协调开发工作，项目托管和版本管理，测试页面Bug并打包</p>
            <p><strong>技术栈：</strong>Vue2.0 + Vue-Router + Vuex + Swiper 等技术开发 SPA 应用</p>
            <p><strong>难点：</strong>路由重定向，首屏加载时间过长，路由切换页面白屏，页面状态缓存</p>
            <p><strong>收益：</strong>帮助前端组长重构了公司官网，大幅提升了页面响应和切换速度，缩减了项目体积，减小了各页面的标签层级，最大程度复用了重复数据，提升后期维护的效率。 </p>
          </Col>
          <Col>
            <h4 className='f-w-900'>个人网站(个人) </h4>
            <p><strong>概述：</strong> React 从 0 到 1 个人博客项目（简历，文章，留言板），打包并上线</p>
            <p><strong>技术栈：</strong>前台：React + Redux + Antd + Axios + Aos 后台：Nodejs + Restify + MongoDB </p>
            <p><strong>角色：</strong>独立前端设计与开发、独立后端设计与开发 </p>
          </Col>
        </Row>
      </section>
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">自我评价</h2>
        <Row>
          <Col span={24}>
            性格内敛沉稳，喜欢分享，爱好自学
          </Col>
          <Col span={24}>
            喜欢尝试，期待新鲜事物，注意细节，注重效率
          </Col>
        </Row>
      </section>
    </main>
  )
}

export default Cv