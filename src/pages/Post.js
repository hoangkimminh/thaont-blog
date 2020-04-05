import React, { useState } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import firebase from 'firebase'

import Layout from '../components/layouts/Layout'
import './Post.css'
import PostContent from '../components/post/PostContent'
import RecentPost from '../components/post/RecentPost'
import Comments from '../components/post/Comments'
import { useEffect } from 'react'
import { addPageInfo } from '../utils'

const Post = () => {
  const { id, title } = useParams()

  const [state, setState] = useState({
    id: id,
    title: '',
    category: '',
    content: '',
    createAt: '',
    imgURL: '',
    textContent: '',
  })

  useEffect(() => {
    document.title = title
    firebase
      .database()
      .ref('posts/')
      .child(id)
      .on('value', async (snapshot) => {
        const postData = snapshot.toJSON()
        await setState({
          title: postData.title,
          category: postData.category,
          content: postData.content,
          createAt: postData.createAt,
          imgURL: postData.imgURL,
          textContent: postData.textContent,
        })
        await addPageInfo({
          title: postData.title,
          image: postData.imgURL,
          description: postData.textContent
            .replace(/\s\s+/g, ' ')
            .replace('\n', '. ')
            .substr(2, 150),
          url: window.location.href,
          type: 'article',
        })
      })
  }, [title, id])

  return (
    <Layout>
      <PostContent id={id} />
      <Comments postId={id} />
      <RecentPost />
    </Layout>
  )
}

export default withRouter(Post)
