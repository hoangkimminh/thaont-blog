import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import firebase from 'firebase'

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
          I'm Thảo
        </button>
      </div>
    </Layout>
  )
}

const PostCreatorStage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [imgURL, setImgURL] = useState('')

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  const onChangeTitle = (event) => {
    const data = event.target.value
    setTitle(data)
  }

  const onChangeCategory = (event) => {
    const data = event.target.value
    setCategory(data)
  }

  const onChangeImgURL = (event) => {
    const data = event.target.value
    setImgURL(data)
  }

  const onSubmitPost = () => {
    var date = new Date().getDate() //Current Date
    var month = new Date().getMonth() + 1 //Current Month
    var year = new Date().getFullYear() //Current Year
    var hours = new Date().getHours() //Current Hours
    var min = new Date().getMinutes() //Current Minutes
    var sec = new Date().getSeconds() //Current Seconds

    const post = {
      title: title,
      category: category,
      imgURL: imgURL,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      textContent: editorState
        .getCurrentContent()
        .getPlainText()
        .replace('\n', '.'),
      createAt: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
    }

    firebase
      .database()
      .ref('posts/')
      .push(post)
      .then((data) => {
        alert("Tạo thành công nha bạn iu")
        window.location.href ='/'
      })
      .catch((err) => alert("Sorry bae! Có lỗi từ server!"))
  }
  return (
    <Layout>
      <div className='container' style={{ minHeight: '100vh' }}>
        <h4 className='font-weight-bold text-uppercase pt-2'>Create new post</h4>
        <form>
          <div className='form-group'>
            <label className='font-weight-bold'>Title</label>
            <input type='text' className='form-control' onChange={onChangeTitle} />
          </div>
          <div className='form-group'>
            <label className='font-weight-bold'>Category</label>
            <input type='text' className='form-control' onChange={onChangeCategory} />
          </div>
          <div className='form-group'>
            <label className='font-weight-bold'>URL of corresponding picture</label>
            <input type='url' className='form-control' onChange={onChangeImgURL} />
          </div>
          <label className='font-weight-bold'>Content</label>
          <div className='border'>
            <Editor
              editorState={editorState}
              wrapperClassName='demo-wrapper'
              editorClassName='demo-editor'
              onEditorStateChange={onEditorStateChange}
            ></Editor>
          </div>
        </form>
        <button
          className='btn mt-2'
          style={{ backgroundColor: '#2F4F4F', color: '#ffffff' }}
          data-toggle='modal'
          data-target='#staticBackdrop'
        >
          Submit
        </button>
        <div
          className='modal fade'
          id='staticBackdrop'
          data-backdrop='static'
          tabindex='-1'
          role='dialog'
          aria-labelledby='staticBackdropLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='staticBackdropLabel'>
                  Submit your post
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>Are you sure?</div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>
                  Cancel
                </button>
                <button type='button' className='btn btn-primary' onClick={onSubmitPost}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostCreator
