import React from 'react'
import Image1 from '../../images/img1.jpg'
import Image2 from '../../images/img2.jpg'
import Image3 from '../../images/img3.jpg'

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

export default Carousel
