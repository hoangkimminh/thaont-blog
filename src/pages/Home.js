import React from 'react'
import Layout from '../components/layouts/Layout'
import ListPost from '../components/home/ListPost'
import Carousel from '../components/home/Carousel'
import { useEffect } from 'react'
import { addPageInfo } from '../utils'

const Home = () => {
  useEffect(() => {
    document.title = 'Little corner of mine'
    addPageInfo({
      title: 'Little corner of mine',
      description: 'Góc nhỏ nơi cất những chia sẻ của Thảo',
      image: 'https://thaont-blog.now.sh/static/media/img1.60ae67dd.jpg',
      type: 'article',
      url: window.location.href,
    })
  })

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
