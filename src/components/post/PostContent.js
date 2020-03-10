import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'

import colors from '../../utils/colors'

const PostContent = (props) => {
  const { id } = props
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
  }, [id])

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

export default PostContent