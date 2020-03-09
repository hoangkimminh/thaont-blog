import React from 'react'
import Layout from '../components/layouts/Layout'
import ListPost from '../components/home/ListPost'
import Carousel from '../components/home/Carousel'

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

export default Home
