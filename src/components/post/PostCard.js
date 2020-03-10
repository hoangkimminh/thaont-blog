import React from 'react'
import Truncate from 'react-truncate'
import { Link } from 'react-router-dom'

import NoImgAvailable from '../../images/no_img_available.jpg'
import colors from '../../utils/colors'

const PostCard = (props) => {
  return (
    <div
      className='col-md col-sm-6 mt-1 mr-1'
      style={{
        borderRadius: '5px',
        backgroundColor: '#ffffff',
        padding: '1rem',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'
      }}
    >
      <div className='row'>
        <div className='col-md-12 col-6 d-flex'>
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

export default PostCard
