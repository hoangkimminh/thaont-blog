import React, { useState } from 'react'
import Layout from '../components/layouts/Layout'
// import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { withRouter } from 'react-router-dom'

import PostCreatorStage from '../components/post-creator/PostCreatorStage'
const PostCreator = () => {
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(true)

  const onCheckIsAdmin = () => {}

  return isAdmin ? (
    <PostCreatorStage></PostCreatorStage>
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

export default withRouter(PostCreator)
