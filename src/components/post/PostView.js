import React from 'react'
import { useParams } from 'react-router-dom'

import PostContent from './PostContent'
import Comments from './Comments'

const PostView = () => {
  const { id } = useParams()
  return (
    <React.Fragment>
      <PostContent id={id} />
      <Comments postId={id} />
    </React.Fragment>
  )
}

export default PostView
