import * as React from 'react'
import './Notfound.scss'

import { Button } from 'antd'

// import createHistory from 'history/createHashHistory'

const history = require("history").createHashHistory()

const goBackPage = () => {
  history.go(-1)
}

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1>404 Not Found </h1>
      <div className="back">
        <Button color='dark' onClick={goBackPage}>返回上一页</Button>
      </div>
    </div>
  )
}

export default NotFound