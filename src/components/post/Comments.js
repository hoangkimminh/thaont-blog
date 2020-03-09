import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

import colors from '../../utils/colors'
import { getCurrentTime } from '../../utils/index'

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
                  <div className='comment px-2' key={i} id={comment.id}>
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

export default Comments
