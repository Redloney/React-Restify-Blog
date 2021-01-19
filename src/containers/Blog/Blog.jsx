import * as React from 'react';

import './Blog.scss'

class Blog extends React.Component {
  render () {
    return (
      <div className="blog">
        <section className="section">
          <div className="content">
            <h2 className="title">A catchy title here</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur, ut debitis? Ea commodi, molestiae iusto quos ipsam ipsum est, cum magni eius natus ipsa beatae aut accusamus. Beatae, odit nesciunt.</p>
          </div>
        </section>
      </div>
    )
  }
}

export default Blog