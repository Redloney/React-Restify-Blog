import * as React from 'react';
import { PureComponent } from 'react';

import './Cv.scss'

export default class Cv extends PureComponent {

  // 回顶部

  componentDidMount () {
    // 不记录滚动条位置，默认回到顶部
    document && document.documentElement ? document.documentElement.scrollTop = 0 : null;
  }

  render () {
    return (
      <main className="cv">
        <section className='section'>
          <h2 className="title">个人信息</h2>
          <div className="info">
            <div className="row">
              <div className="col-4 m-b-20">乐文俊 - 男 - 1998</div>
              <div className="col-4 m-b-20">本科 - 湖北大学-计算机应用技术</div>
              <div className="col-4 m-b-20">前端开发 - 1年经验</div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}