import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

import PostCard from './PostCard'

const RecentPost = () => {
  const [recentPosts, setRecentPosts] = useState([])

  useEffect(() => {
    let data = []
    firebase
      .database()
      .ref('posts/')
      .orderByChild('createAt')
      .limitToLast(5)
      .on('value', (snapshot) => {
        snapshot.forEach((childSnap) => {
          let childData = childSnap.val()
          data.push({
            id: childSnap.key,
            title: childData.title,
            imgURL: childData.imgURL,
            category: childData.category,
            textContent: childData.textContent,
            createAt: childData.createAt
          })
        })
        setRecentPosts(data.reverse())
      })
  }, [])

  const listPostCard =
    Array.isArray(recentPosts) &&
    recentPosts.map((post, i) => {
      return <PostCard data={post} key={i} id={post.id}></PostCard>
    })

  return (
    <div className='container my-2'>
      <h3>Recent posts</h3>
      <div className='row mt-3 mx-1 d-flex justify-content-start'>{listPostCard}</div>
    </div>
  )
}

export default RecentPost
