import React from 'react'

import Header from './Header'

const Layout = (props) => {
  return (
    <div id='app'>
      <Header></Header>
      <div id='main'>
        {props.children}
      </div>
    </div>
  )
}

export default Layout
