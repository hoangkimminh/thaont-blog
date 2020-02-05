import React, { useState, useEffect } from 'react'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import firebase from 'firebase'
import { withRouter, useParams } from 'react-router-dom'
import htmlToDraft from 'html-to-draftjs'

import { store } from 'react-notifications-component'

import Layout from '../components/Layout'

const PostEditor = (props) => {
  const { id } = useParams()
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(true)

  const onCheckIsAdmin = () => {}

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

const PostEditorStage = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [createAt, setCreateAt] = useState('')
  useEffect(() => {
    fetchPostData()
  }, [])

  const fetchPostData = async () => {
    firebase
      .database()
      .ref('posts/')
      .child(props.id)
      .on('value', (snapshot) => {
        const postData = snapshot.toJSON()
        setTitle(postData.title)
        setCategory(postData.category)
        setImgURL(postData.imgURL)
        setCreateAt(postData.createAt)
        //Text content to HTML
        const content = postData.content
        const blocksFromHtml = htmlToDraft(content)
        const { contentBlocks, entityMap } = blocksFromHtml
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
        setEditorState(EditorState.createWithContent(contentState))
      })
  }

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
    const post = {
      title: title,
      category: category,
      imgURL: imgURL,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      textContent: editorState
        .getCurrentContent()
        .getPlainText()
        .replace('\n', '.'),
      createAt: createAt
    }

    firebase
      .database()
      .ref('posts/' + props.id)
      .set(post)
      .then(async () => {
        await store.addNotification({
          title: 'Wonderful!',
          message: 'Hihi! Update thành công nha <3',
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
        window.location.href = '/'
      })
      .catch(() => {
        store.addNotification({
          title: 'Oops',
          message: 'Éc! Có lỗi gì ý :( Thử lại nha',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      })
  }
  return (
    <Layout>
      <div className='container' style={{ minHeight: '100vh' }}>
        <h4 className='font-weight-bold text-uppercase pt-2'>Create new post</h4>
        <form>
          <div className='form-group'>
            <label className='font-weight-bold'>Title</label>
            <input
              type='text'
              defaultValue={title}
              className='form-control'
              onChange={onChangeTitle}
            />
          </div>
          <div className='form-group'>
            <label className='font-weight-bold'>Category</label>
            <input
              type='text'
              defaultValue={category}
              className='form-control'
              onChange={onChangeCategory}
            />
          </div>
          <div className='form-group'>
            <label className='font-weight-bold'>URL of corresponding picture</label>
            <input
              type='url'
              defaultValue={imgURL}
              className='form-control'
              onChange={onChangeImgURL}
            />
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
          tabIndex='-1'
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
export default withRouter(PostEditor)
