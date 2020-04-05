import React from 'react'
import { useParams, withRouter } from 'react-router-dom'

import Layout from '../components/layouts/Layout'
import './Post.css'
import PostContent from '../components/post/PostContent'
import RecentPost from '../components/post/RecentPost'
import Comments from '../components/post/Comments'
import { useEffect } from 'react'

const Post = () => {
  const { id, title } = useParams()
  useEffect(() => {
    document.title = title
  }, [title])
  
  return (
    <Layout>
      <PostContent id={id} />
      <Comments postId={id} />
      <RecentPost />
    </Layout>
  )
}

export default withRouter(Post)
