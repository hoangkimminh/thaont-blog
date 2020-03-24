import React, { useState, useEffect } from 'react'
import { withRouter, useParams } from 'react-router-dom'

import Layout from '../components/layouts/Layout'
import PostEditorStage from '../components/post-editor/PostEditorStage'

const PostEditor = () => {
  const { id } = useParams()
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(true)

  const onCheckIsAdmin = () => {}

  useEffect(() => {
    document.title = 'Create a new post'
  })

  return isAdmin ? (
    <PostEditorStage id={id}></PostEditorStage>
  ) : (
    <Layout>
      <div className='container' style={{ minHeight: '100vh' }}>
        <form>
          <div className='form-group'>
            <label className='font-weight-bold'>Password</label>
            <input
              type='password'
              className='form-control'
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </form>
        <button
          className='btn mt-2'
          style={{ backgroundColor: '#2F4F4F', color: '#ffffff' }}
          onClick={onCheckIsAdmin}
        >
          I&apos;m Thảo
        </button>
      </div>
    </Layout>
  )
}

export default withRouter(PostEditor)
