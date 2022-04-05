import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from 'src/slices/loadingSlice'

import { apiGetOwnerAssets } from 'src/utils/api'
import { getCurrentWalletAddress } from 'src/utils/wallet'

import MNFTItem from 'src/components/MNFTItem'

const AssetsPage = () => {
  const dispatch = useDispatch()
  const [assets, setAssets] = useState([])

  const { address } = useParams()

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))
      try {
        const wallet_address = address
          ? address
          : await getCurrentWalletAddress()
        const res = await apiGetOwnerAssets(wallet_address)
        setAssets(res)
        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, [dispatch, address])

  return (
    <div className='asset-list'>
      {assets?.map((asset, ind) => (
        <MNFTItem key={`asset${ind}`} nft={asset} />
      ))}
    </div>
  )
}

export default AssetsPage
