import React from 'react'
import Truncate from 'react-truncate'
import { Link } from 'react-router-dom'
import NoImgAvailable from '../../images/no_img_available.jpg'
import colors from '../../utils/colors'

const PostCard = (props) => {
  return (
    <div
      className='row mx-1'
      style={{
        borderRadius: '5px',
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
            borderRadius: '5px'
          }}
        />
      </div>
      <div className='col-md-8 col-sm-12 px-md-5 py-4'>
        <span className='font-weight-bold font-italic'>{props.data.category}</span>
        <h3 className='font-weight-bold mt-1' style={{ color: colors.title_warm }}>
          {props.data.title}
        </h3>
        <span className='text-muted font-italic'>{props.data.createAt}</span>
        <div className='mt-1'>
          <Truncate lines={4} ellipsis={<span>...</span>}>
            {props.data.textContent}
          </Truncate>
        </div>
        <Link to={'/posts/' + props.data.title + '/' + props.data.id}>
          <a
            className='btn mt-1'
            style={{ backgroundColor: colors.title_warm, color: '#ffffff' }}
          >
            Read more...
          </a>
        </Link>
      </div>
    </div>
  )
}

export default PostCard
