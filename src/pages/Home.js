import React, { useState, useEffect } from 'react'
import Truncate from 'react-truncate'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

import Image1 from '../images/img1.jpg'
import Image2 from '../images/img2.jpg'
import Image3 from '../images/img3.jpg'
import NoImgAvailable from '../images/no_img_available.jpg'
import colors from '../utils/colors'

import firebase from 'firebase'
import ClipLoader from 'react-spinners/ClipLoader'

const Home = () => {
  return (
    <Layout>
      <div>
        <div
          className='d-flex justify-content-center align-items-center font-weight-bold text-center'
          style={{ height: '150px', fontSize: '3em' }}
        >
          LITTLE CORNER OF MINE
        </div>
        <Carousel></Carousel>
        <ListPost></ListPost>
      </div>
    </Layout>
  )
}

const Carousel = () => {
  return (
    <div className='container'>
      <div id='carouselExampleCaptions' className='carousel slide' data-ride='carousel'>
        <ol className='carousel-indicators'>
          <li
            data-target='#carouselExampleCaptions'
            data-slide-to='0'
            className='active'
          ></li>
          <li data-target='#carouselExampleCaptions' data-slide-to='1'></li>
          <li data-target='#carouselExampleCaptions' data-slide-to='2'></li>
        </ol>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <img src={Image1} className='d-block w-100' alt='...' />
          </div>
          <div className='carousel-item'>
            <img src={Image2} className='d-block w-100' alt='...' />
          </div>
          <div className='carousel-item'>
            <img src={Image3} className='d-block w-100' alt='...' />
          </div>
        </div>
        <a
          className='carousel-control-prev'
          href='#carouselExampleCaptions'
          role='button'
          data-slide='prev'
        >
          <span className='carousel-control-prev-icon' aria-hidden='true'></span>
          <span className='sr-only'>Previous</span>
        </a>
        <a
          className='carousel-control-next'
          href='#carouselExampleCaptions'
          role='button'
          data-slide='next'
        >
          <span className='carousel-control-next-icon' aria-hidden='true'></span>
          <span className='sr-only'>Next</span>
        </a>
      </div>
      <hr />
    </div>
  )
}

const ListPost = () => {
  const [listPost, setListPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let data = []
  useEffect(() => {
    firebase
      .database()
      .ref('posts/')
      .on('value', (snapshot) => {
        snapshot.forEach((childSnap) => {
          let childData = childSnap.val()
          data.push({
            id: childSnap.key,
            title: childData.title,
            category: childData.category,
            imgURL: childData.imgURL,
            textContent: childData.textContent,
            createAt: childData.createAt
          })
        })
        setListPost(data)
        setIsLoading(false)
      })
  }, [])

  const listPostCard =
    Array.isArray(listPost) &&
    listPost.map((post, i) => {
      return (
        <React.Fragment key={i}>
          <PostCard data={post}></PostCard>
          <br />
          <br />
        </React.Fragment>
      )
    })

  return (
    <div className='container'>
      <h4 className='pl-2 font-weight-bold'>All posts</h4>
      <br />
      <div className='d-flex justify-content-center'>
        {!isLoading && <div>{listPostCard}</div>}
        {isLoading && (
          <div>
            <ClipLoader color='#2F4F4F'></ClipLoader>
          </div>
        )}
      </div>
    </div>
  )
}

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
        <span className='font-weight-bold font-italic'>
          {props.data.category}
        </span>
        <h3 className='font-weight-bold mt-1' style={{ color: colors.title_warm }}>
          {props.data.title}
        </h3>
        <span className='text-muted font-italic'>{props.data.createAt}</span>
        <div className='mt-1'>
          <Truncate lines={4} ellipsis={<span>...</span>}>
            {props.data.textContent}
          </Truncate>
        </div>
        <Link to={'/posts/' + props.data.id}>
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

export default Home
