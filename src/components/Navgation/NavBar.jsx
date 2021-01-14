import * as React from 'react'

import { Link } from 'react-router-dom'

import './NavBar.scss'

import PropTypes from 'prop-types'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    active: PropTypes.number
  }

  render () {
    const { active } = this.props
    const links = [{
      label: '简历',
      path: "/cv"
    }, {
      label: '博客',
      path: "/blog"
    }, {
      label: '留言',
      path: "/message"
    }]
    return (
      <nav className='nav'>
        <ul className="nav-links">
          {
            links.map(({ label, path }, index) => {
              return (
                <li key={index} className={`nav-link ${active === index ? 'active' : null}`}>
                  <Link to={path}> {label} </Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
    )
  }
}

export default NavBar