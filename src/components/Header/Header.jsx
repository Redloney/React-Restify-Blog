import * as React from 'react'

import { Avatar } from 'antd'

import './Header.scss'
import NavBar from '../Navgation/NavBar'

import { Link } from 'react-router-dom'

// import img from './preview.png'
import img from './img.png'

const Header = () => {
  return (
    <header className='header'>
      <div className="wrapper">
        <div className="avatar">
          <Link to='/'>
            <Avatar src={img} size={110} />
          </Link>
        </div>
        <div className="id">
          <Link to='/'>
            <h1>RedLonely</h1>
          </Link>
        </div>
        <div className="faithful">
          一面选择放弃,一面劝自己走到底！
        </div>
        <NavBar active={2} />
      </div>
    </header>
  )
}

export default Header 
