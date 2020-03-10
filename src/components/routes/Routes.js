import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from '../../pages/Home'
import PostCreator from '../../pages/PostCreator'
import Post from '../../pages/Post'
import Admin from '../../pages/Admin'
import PostEditor from '../../pages/PostEditor'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/create-post'>
          <PostCreator />
        </Route>
        <Route exact path='/posts/:id'>
          <Post />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/admin'>
          <Admin />
        </Route>
        <Route exact path='/admin/edit/:id'>
          <PostEditor />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
