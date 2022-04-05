import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from 'src/slices/loadingSlice'

import { apiGetCollections } from 'src/utils/api'

import MCollectionItem from 'src/components/MCollectionItem'

const AllCollectionsPage = () => {
  const dispatch = useDispatch()
  const [collections, setCollections] = useState([])

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))
      try {
        const res = await apiGetCollections()
        setCollections(res)
        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, [dispatch])

  return (
    <>
      <div className='collection-list'>
        {collections?.map((collection, index) => (
          <MCollectionItem key={`collection${index}`} collection={collection} />
        ))}
      </div>
    </>
  )
}

export default AllCollectionsPage
