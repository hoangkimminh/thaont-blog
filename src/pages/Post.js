import React from 'react'
import { useParams, withRouter } from 'react-router-dom'

import Layout from '../components/layouts/Layout'
import './Post.css'
import PostContent from '../components/post/PostContent'
import RecentPost from '../components/post/RecentPost'
import Comments from '../components/post/Comments'

const Post = () => {
  const { id } = useParams()
  return (
    <Layout>
      <PostContent />
      <Comments postId={id} />
      <RecentPost />
    </Layout>
  )
}

export default withRouter(Post)
