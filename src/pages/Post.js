import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import firebase from 'firebase'

import { useParams } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import Truncate from 'react-truncate'
import { Link } from 'react-router-dom'

import Layout from '../components/Layout'
import './Post.css'
import NoImgAvailable from '../images/no_img_available.jpg'

const Post = () => {
  let { id } = useParams()
  const [state, setState] = useState({
    id: id,
    title: '',
    category: '',
    content: '',
    createAt: ''
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    firebase
      .database()
      .ref('posts/')
      .child(id)
      .on('value', (snapshot) => {
        const postData = snapshot.toJSON()
        setState({
          title: postData.title,
          category: postData.category,
          content: postData.content,
          createAt: postData.createAt
        })
        setIsLoading(false)
      })
  }, [])

  return (
    <Layout>
      <div
        className='container mt-3'
        style={{
          borderRadius: '15px',
          backgroundColor: '#ffffff',
          padding: '2rem',
          boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'
        }}
      >
        {isLoading && (
          <div className='text-center'>
            <ClipLoader color='#2F4F4F'></ClipLoader>
          </div>
        )}
        {!isLoading && (
          <React.Fragment>
            <span
              className='post-category text-uppercase font-weight-bold font-italic'
              style={{ color: '#2F4F4F' }}
            >
              {state.category}
            </span>
            <h1 className='post-title font-weight-bold'>{state.title}</h1>
            <span className='post-category text-uppercase text-muted font-italic'>
              {state.createAt}
            </span>
            {parse(state.content)}
          </React.Fragment>
        )}
      </div>
      <RecentPost></RecentPost>
    </Layout>
  )
}

const RecentPost = () => {
  const [recentPosts, setRecentPosts] = useState([])

  useEffect(() => {
    let data = []
    firebase
      .database()
      .ref('posts/')
      .orderByChild('createAt')
      .limitToLast(3)
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
        setRecentPosts(data)
      })
  }, [])

  const listPostCard =
    Array.isArray(recentPosts) &&
    recentPosts.map((post, i) => {
      return <PostCard data={post} key={i} id={post.id}></PostCard>
    })

  return (
    <div className='container mt-2'>
      <h3>Recent posts</h3>
      <div className='row mt-3'>{listPostCard}</div>
    </div>
  )
}

const PostCard = (props) => {
  return (
    <div
      className='col-md-3 col-sm-6 mx-1 mt-1'
      style={{
        borderRadius: '15px',
        backgroundColor: '#ffffff',
        padding: '1rem',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'
      }}
    >
      <div className='row'>
        <div className='col-md-12 col-6 d-flex justify-content-center'>
          <img
            src={props.data.imgURL !== '' ? props.data.imgURL : NoImgAvailable}
            className='img-thumbnail'
            alt='My avatar'
            style={{
              borderColor: '#ffffff',
              borderRadius: '15px'
            }}
          />
        </div>
        <div className='col-md-12 col-6 px-md-3 py-2 p-sm-2'>
          <span className='text-uppercase font-weight-bold font-italic'>
            {props.data.category}
          </span>
          <Link to={'/posts/' + props.data.id}>
            <h3 className='font-weight-bold mt-1' style={{ color: '#2F4F4F' }}>
              {props.data.title}
            </h3>
          </Link>
          <span className='text-muted font-italic'>{props.data.createAt}</span>
          <div className='mt-1'>
            <Truncate lines={2} ellipsis={<span>...</span>}>
              {props.data.textContent}
            </Truncate>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
