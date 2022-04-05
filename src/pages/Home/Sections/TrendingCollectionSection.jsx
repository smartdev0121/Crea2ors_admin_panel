import React, { useEffect, useState } from 'react'
import { apiGetCollections } from 'src/utils/api'

import Carousel from 'react-multi-carousel'

import MCollectionItem from 'src/components/MCollectionItem'

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

const TrendingCollectionSection = () => {
  const [trendingCollections, setTrendingCollections] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await apiGetCollections()
        setTrendingCollections(res)
      } catch {}
    })()
  }, [])

  return (
    <section className='section-trending-collection'>
      <div className='container'>
        <h3>Trending collections</h3>
        <div className='trending-collection-list'>
          {trendingCollections.map((collection, index) => (
            <MCollectionItem key={`trending_${index}`} collection={collection} />
          ))}
        </div>

        <Carousel
          autoPlaySpeed={20000}
          infinite={true}
          showDots={true}
          responsive={responsive}
          arrows={false}
          dotListClass='carousel-custom-dot-list'
          itemClass='carousel-item'
        >
          {trendingCollections.map((collection, index) => (
            <MCollectionItem key={`trending_${index}`} collection={collection} />
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default TrendingCollectionSection
