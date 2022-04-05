import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from 'src/slices/loadingSlice'

import { apiGetCollections } from 'src/utils/api'
import { getCurrentWalletAddress } from 'src/utils/wallet'

import MCollectionItem from 'src/components/MCollectionItem'

const MyCollectionsPage = () => {
  const dispatch = useDispatch()

  const [collections, setCollections] = useState([])

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))
      try {
        const address = await getCurrentWalletAddress()
        const res = await apiGetCollections(address)
        setCollections(res || [])
        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, [dispatch])

  return (
    <div className='collection-list'>
      {collections?.map((collection, index) => (
        <MCollectionItem key={`collection${index}`} collection={collection} />
      ))}
    </div>
  )
}

export default MyCollectionsPage
