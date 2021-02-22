import * as React from 'react';
import { Link } from 'react-router-dom'

import './Blog.scss'
const Blog = () => {
  return (
    <div className="blog">
      <Link to='/detail'>
        <section className="section">
          <div className="content">
            <p>
              风急天高猿啸哀，渚清沙白鸟飞回。<br />
              无边落木萧萧下，不尽长江滚滚来。<br />
              万里悲秋常作客，百年多病独登台。<br />
              艰难苦恨繁霜鬓，潦倒新停浊酒杯。<br />
            </p>
          </div>
        </section>
      </Link>
    </div>
  );
}

export default Blog