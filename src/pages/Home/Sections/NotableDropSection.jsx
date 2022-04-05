import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'

import Carousel from 'react-multi-carousel'

import { apiGetCollections } from 'src/utils/api'

import MDropItem from 'src/components/MDropItem'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 694 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 694, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
}

const NotableDropSection = () => {
  const [drops, setDrops] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await apiGetCollections()
        setDrops(res)
      } catch {}
    })()
  }, [])

  return (
    <Box className='section-notable-drop'>
      <div className='container'>
        <h3>Notable Drops</h3>
        <Carousel
          autoPlaySpeed={20000}
          infinite={true}
          showDots={true}
          responsive={responsive}
          arrows={false}
          dotListClass='carousel-custom-dot-list'
          itemClass='carousel-item'
        >
          {drops.map((drop, index) => (
            <MDropItem key={`drop_${index}`} drop={drop} />
          ))}
        </Carousel>
        ;
      </div>
    </Box>
  )
}

export default NotableDropSection
