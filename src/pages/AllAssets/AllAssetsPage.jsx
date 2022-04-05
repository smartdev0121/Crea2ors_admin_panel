import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setLoading } from 'src/slices/loadingSlice'
import { apiGetAssets } from 'src/utils/api'

import MNFTItem from 'src/components/MNFTItem'

const AllAssetPage = () => {
  const dispatch = useDispatch()
  const [assets, setAssets] = useState([])

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))
      try {
        const res = await apiGetAssets()
        setAssets(res)
        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, [dispatch])

  return (
    <div className='asset-list'>
      {assets?.map((asset, ind) => (
        <MNFTItem key={`asset${ind}`} nft={asset} />
      ))}
    </div>
  )
}

export default AllAssetPage
