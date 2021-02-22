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
          {/* <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>湖北生物科技职业学院 - 计算机应用技术</Col> */}
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>湖北生科 - 计算机应用技术</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>前端开发 - 1年工作经验</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>期望职位: Web前端开发</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={16} md={16} lg={16} xl={16} span={16}>期望城市: 武汉</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}><a href="https://github.com/redloney" target='_blank' rel="noreferrer">Github: https://github.com/redloney</a></Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}><a href="https://gitee.com/redloney" target='_blank' rel="noreferrer">Gitee: https://gitee.com/redloney</a></Col>
        </Row>
      </section>
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">联系方式</h2>
        <Row>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={8} md={8} lg={8} xl={8} span={8}>手机: 18030842838</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={8} md={8} lg={8} xl={8} span={8}>Email: 67591500@qq.com</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={8} md={8} lg={8} xl={8} span={8}>网站: www.redloney.cn</Col>
        </Row>
      </section>
      {/* <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">开源项目</h2>
        <Row>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}>个人博客：React + Redux + Antd + Restify + MongoDB  ( 简历，文章，留言板 )</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}>线上持续维护项目，新技术踩坑，持续优化</Col>
        </Row>
      </section> */}
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">技能掌握</h2>
        <Row>
          {/* <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}><strong>•</strong>  一年前端开发经验</Col> */}
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}> <strong>-</strong> 擅长 PC页面 H5页面  Flex和响应式布局</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}> <strong>-</strong> 前端技术熟悉 React Vue 熟悉组件化开发及构建优化</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}> <strong>-</strong> 后端技术熟悉 NodeJS Restify 数据库熟悉 MongoDB</Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}> <strong>-</strong> 了解 C# 和 .Net开发 MVC SQL Server 数据库的使用 </Col>
        </Row>
      </section>
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">工作经验</h2>
        <Row>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}>武汉斑马快跑公司 (2019.8 - 2020.2) </Col>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}>研发部/前端开发实习 </Col>
        </Row>
      </section>
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">项目经验</h2>
        <Row>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}>
            <h4>斑马官网重构(Vue)</h4>
            <p>1. vuex 管理数据，减少代码冗余，重写轮播图模块，添加回到顶部功能</p>
            <p>2. 懒加载减少首屏响应时间，使用动画库丰富交互效果，缓存页面状态防止白屏</p>
            <p>3. 根据需求打磨细节，全程使用 Git 管理代码，使用 Gitee 托管项目</p>
          </Col>
        </Row>
      </section>
      <section className='section' data-aos='fade-up'
        data-aos-duration={500}>
        <h2 className="title">自我评价</h2>
        <Row>
          <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}>性格内敛，积极开朗，把握细节，敢于承担责任，善于分析问题。</Col>
        </Row>
      </section>
    </main>
  )
}

export default Cv