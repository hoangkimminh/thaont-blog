import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import firebase from 'firebase'

import { useParams } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import Truncate from 'react-truncate'
import { Link } from 'react-router-dom'
import { store } from 'react-notifications-component'

import Layout from '../components/Layout'
import './Post.css'
import NoImgAvailable from '../images/no_img_available.jpg'
import colors from '../utils/colors'
import { getCurrentTime } from '../utils/index'

const PostContent = () => {
  const { id } = useParams()
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])
  return (
    <div className='container post-content'>
      <div
        className='container mt-3'
        style={{
          borderRadius: '5px',
          backgroundColor: '#ffffff',
          padding: '2rem',
          boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'
        }}
      >
        {isLoading && (
          <div className='text-center'>
            <ClipLoader color={colors.title_warm}></ClipLoader>
          </div>
        )}
        {!isLoading && (
          <React.Fragment>
            <span
              className='post-category font-weight-bold font-italic'
              style={{ color: colors.title_warm }}
            >
              {state.category}
            </span>
            <h1 className='post-title font-weight-bold'>{state.title}</h1>
            <span className='post-createAt text-uppercase text-muted font-italic'>
              {state.createAt}
            </span>
            {parse(state.content)}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

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
            category: childData.category,
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
      className='col-md-3 col-sm-6 mt-1'
      style={{
        borderRadius: '5px',
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
              borderRadius: '5px'
            }}
          />
        </div>
        <div className='col-md-12 col-6 px-md-3 py-2 p-sm-2'>
          <span className='font-weight-bold font-italic'>{props.data.category}</span>
          <Link to={'/posts/' + props.data.id}>
            <h3 className='font-weight-bold mt-1' style={{ color: colors.title_warm }}>
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

const Comments = (props) => {
  const { postId } = props

  const [isCommentAvailable, setIsCommentAvailable] = useState(
    localStorage.getItem('guestName') ? true : false
  )
  const [guestName, setGuestName] = useState(localStorage.getItem('guestName'))
  const [commentContent, setCommentContent] = useState('')
  const [listComment, setListComment] = useState([])
  const [currentCommentIdToReply, setCurrentCommentIdToReply] = useState(null)
  const [replyContent, setReplyContent] = useState('')

  useEffect(() => {
    getListComment()
  }, [])

  const getListComment = () => {
    const commentsData = []
    firebase
      .database()
      .ref('posts/' + postId + '/comments/')
      .on('value', (snapshot) => {
        snapshot.forEach((childSnap) => {
          let childData = childSnap.val()
          const repliesObject = childData.replies
          const replies = []
          for (const id in repliesObject) {
            const eachReplyObject = repliesObject[id]
            const content = eachReplyObject.content
            const guestName = eachReplyObject.guestName
            const createdAt = eachReplyObject.createdAt
            replies.push({ id: id, content, guestName, createdAt })
          }
          commentsData.push({
            id: childSnap.key,
            guestName: childData.guestName,
            content: childData.content,
            replies: replies,
            createdAt: childData.createdAt
          })
        })
        setListComment(commentsData)
      })
  }

  const onChangeCommentContent = (e) => {
    setCommentContent(e.target.value)
    console.log(commentContent)
  }

  const onSendComment = (e) => {
    e.preventDefault()

    const comment = {
      guestName: guestName,
      content: commentContent,
      createdAt: getCurrentTime()
    }

    firebase
      .database()
      .ref('posts/' + postId + '/comments/')
      .push(comment)
      .then(() => {
        store.addNotification({
          title: 'Wonderful!',
          message: 'Ố là la! Đã comment',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        })
        setCommentContent('')
        getListComment()
      })
      .catch((err) => console.error(err))
  }

  const onSendReply = (e) => {
    e.preventDefault()
    const reply = {
      guestName: guestName,
      content: replyContent,
      createdAt: getCurrentTime()
    }

    firebase
      .database()
      .ref('posts/' + postId + '/comments/' + currentCommentIdToReply + '/replies/')
      .push(reply)
      .then(() => {
        store.addNotification({
          title: 'Wonderful!',
          message: 'Ố là la! Đã reply',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        })
        setReplyContent('')
        getListComment()
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className='container mt-2'>
      <h3>Comments</h3>

      <div
        className='mt-3'
        style={{
          borderRadius: '5px',
          backgroundColor: '#ffffff',
          padding: '2rem',
          boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'
        }}
      >
        {!isCommentAvailable && (
          <form>
            <div className='form-inline'>
              <label className='font-weight-bold'>Comments with your name: </label>
              <input
                type='text'
                className='form-control ml-1'
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
              <button
                className='btn btn-primary ml-1'
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.setItem('guestName', guestName)
                  setIsCommentAvailable(true)
                }}
              >
                Save
              </button>
            </div>
          </form>
        )}
        {isCommentAvailable && (
          <div className='comments'>
            <div className='form-group'>
              <label>
                Comment with name: <b>{guestName}</b>
              </label>
              <a
                className='mb-2 ml-2'
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  setIsCommentAvailable(false)
                }}
              >
                <i className='fa fa-edit'></i>
                Change
              </a>
              <textarea
                className='form-control comment-content'
                placeholder='Comment...'
                onChange={onChangeCommentContent}
              ></textarea>
            </div>
            <button
              className='btn text-white mb-2'
              style={{ backgroundColor: colors.background_peach }}
              onClick={onSendComment}
            >
              <i className='fa fa-paper-plane'></i> Send
            </button>
            {Array.isArray(listComment) &&
              listComment.map((comment, i) => {
                return (
                  <div className='comment' key={i} id={comment.id}>
                    <h5
                      className='guest-name font-weight-bold'
                      style={{ color: colors.background_peach }}
                    >
                      {comment.guestName}
                    </h5>
                    <span className='comment-time font-italic'>{comment.createdAt}</span>
                    <p className='comment-content'>
                      {comment.content}
                      <br />
                      <a href='#'>
                        <i
                          className='fa fa-reply'
                          onClick={async (e) => {
                            e.preventDefault()
                            await setCurrentCommentIdToReply(comment.id)
                            document.getElementById('reply' + comment.id).focus()
                          }}
                        />
                      </a>
                    </p>

                    <div className='reply-comments ml-5 pl-2 border-left'>
                      {Array.isArray(comment.replies) &&
                        comment.replies.map((replyComment, i) => {
                          return (
                            <div className='reply-comment' key={i} id={replyComment.id}>
                              <h5
                                className='guest-name font-weight-bold'
                                style={{ color: colors.background_peach }}
                              >
                                {replyComment.guestName}
                              </h5>
                              <span className='comment-time font-italic'>
                                {replyComment.createdAt}
                              </span>
                              <p className='comment-content'>{replyComment.content}</p>
                            </div>
                          )
                        })}
                      {currentCommentIdToReply === comment.id && (
                        <div className='reply-textarea row d-flex align-items-center'>
                          <div className='form-group col-12 col-md-10'>
                            <textarea
                              className='form-control reply-content'
                              id={'reply' + comment.id}
                              placeholder='Reply...'
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                            ></textarea>
                          </div>
                          <div className='col-12 col-md-2'>
                            <button
                              className='btn text-white'
                              style={{ backgroundColor: colors.background_peach }}
                              onClick={onSendReply}
                            >
                              <i className='fa fa-reply'></i> Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Post
