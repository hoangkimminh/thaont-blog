import React from 'react'
import Layout from '../components/layouts/Layout'
import ListPost from '../components/home/ListPost'
import Carousel from '../components/home/Carousel'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    document.title = 'Little corner of mine'
  })

  return (
    <Layout>
      <div>
        <h1
          className='d-flex justify-content-center align-items-center font-weight-bold text-center'
          style={{ height: '150px' }}
        >
          LITTLE CORNER OF MINE
        </h1>
        <Carousel></Carousel>
        <ListPost></ListPost>
      </div>
    </Layout>
  )
}

export default Home
