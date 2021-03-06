import React from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import Truncate from 'react-truncate'
import { store } from 'react-notifications-component'

import NoImgAvailable from '../../images/no_img_available.jpg'

const PostCard = (props) => {
  const onDeletePost = async () => {
    await firebase
      .database()
      .ref('posts/' + props.data.id)
      .remove()
      .then(() => {
        store.addNotification({
          title: 'Wonderful!',
          message: 'Xoá thành công nha bạn iu <3',
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
      .catch(() => {
        store.addNotification({
          title: 'Oops!',
          message: 'Có lỗi gì rồi ấy! Thử lại đi nha',
          type: 'danger',
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
    props.updateListPosts()
  }

  return (
    <div
      className='row mx-1'
      style={{
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'
      }}
    >
      <div className='col-md-4 col-sm-12 p-2 d-flex justify-content-center'>
        <img
          src={props.data.imgURL !== '' ? props.data.imgURL : NoImgAvailable}
          className='img-thumbnail'
          alt='My avatar'
          style={{
            borderColor: '#ffffff',
            borderRadius: '10px'
          }}
        />
      </div>
      <div className='col-md-8 col-sm-12 px-md-5 py-4'>
        <span className='text-uppercase font-weight-bold font-italic'>
          {props.data.category}
        </span>
        <h3 className='font-weight-bold mt-1' style={{ color: '#2F4F4F' }}>
          {props.data.title}
        </h3>
        <span className='text-muted font-italic'>{props.data.createAt}</span>
        <div className='mt-1'>
          <Truncate lines={4} ellipsis={<span>...</span>}>
            {props.data.textContent}
          </Truncate>
        </div>
        <div className='mt-3'>
          <Link to={'/posts/' + props.data.id}>
            <a
              className='btn mt-1'
              style={{ backgroundColor: '#2F4F4F', color: '#ffffff' }}
            >
              <span className='fa fa-eye'></span> View
            </a>
          </Link>
          <Link to={'/admin/edit/' + props.data.id}>
            <a className='btn bg-primary mt-1 ml-2' style={{ color: '#ffffff' }}>
              <span className='fa fa-edit'></span> Edit
            </a>
          </Link>
          <a
            className='btn bg-danger mt-1 ml-2'
            style={{ color: '#ffffff' }}
            data-toggle='modal'
            data-target={'#deletePostModal' + props.data.id}
          >
            <span className='fa fa-trash'></span> Delete
          </a>
        </div>
        <div
          className='modal fade'
          id={'deletePostModal' + props.data.id}
          tabIndex='-1'
          role='dialog'
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Are you sure?</h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                You will delete &apos;{props.data.title}&apos;. You{' '}
                <b>can&apos;t recovery</b> deleted posts
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  data-dismiss='modal'
                  onClick={onDeletePost}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard