import React from 'react'

import './Loading.scss'

const Loading = () => {
  return (
    <div className='loading'>
      <span className='text'>Loading...</span>
      <span className='top'></span>
      <span className='left'></span>
      <span className='right'></span>
    </div>
  )
}

export default Loading