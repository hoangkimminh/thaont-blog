import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import ClipLoader from 'react-spinners/ClipLoader'

import PostCard from './PostCard'

const ListPost = (props) => {
  const [listPost, setListPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let data = []
  useEffect(() => {
    getListPosts()
  }, [])

  const getListPosts = () => {
    setIsLoading(true)
    firebase
      .database()
      .ref('posts/')
      .on('value', (snapshot) => {
        snapshot.forEach((childSnap) => {
          let childData = childSnap.val()
          data.push({
            id: childSnap.key,
            title: childData.title,
            imgURL: childData.imgURL,
            textContent: childData.textContent,
            createAt: childData.createAt
          })
        })
        setListPost(data)
        setIsLoading(false)
      })
  }

  const listPostCard =
    Array.isArray(listPost) &&
    listPost.map((post, i) => {
      return (
        <React.Fragment key={i}>
          <PostCard
            data={post}
            updateListPosts={getListPosts}
            createNotification={props.createNotification}
          ></PostCard>
          <br />
          <br />
        </React.Fragment>
      )
    })

  return (
    <div className='container'>
      <h4 className='pl-2 font-weight-bold'>All posts</h4>
      <div className='d-flex justify-content-center'>
        {!isLoading && <div>{listPostCard}</div>}
        {isLoading && (
          <div>
            <ClipLoader color='#2F4F4F'></ClipLoader>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListPost
