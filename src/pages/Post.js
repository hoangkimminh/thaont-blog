import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from '../components/layouts/Layout'
import './Post.css'
import RecentPost from '../components/post/RecentPost'
import PostView from '../components/post/PostView'

const Post = () => {
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route exact path={path + '/:id'}>
          <PostView />
        </Route>
      </Switch>
      <RecentPost />
    </Layout>
  )
}

export default Post
