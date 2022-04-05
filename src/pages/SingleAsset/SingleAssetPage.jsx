import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from 'src/slices/loadingSlice'

import { getCurrentWalletAddress } from 'src/utils/wallet'
import { apiGetAsset } from 'src/utils/api'

import ImageSection from './Sections/ImageSection'
import MainSection from './Sections/MainSection'
import SummarySection from './Sections/SummarySection'

import styles from './SingleAssetPage.module.scss'

const SingleAssetPage = () => {
  const dispatch = useDispatch()

  const { chainId, address, tokenId } = useParams()

  const [nft, setNft] = useState({})
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))
      try {
        dispatch(setLoading(true))
        const res = await apiGetAsset(address, chainId, tokenId)
        const addr = await getCurrentWalletAddress()
        setNft(res)
        setWalletAddress(addr)
        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, []) //eslint-disable-line

  return (
    <main className={styles.singleAssetPage}>
      <div className='container'>
        <ImageSection ImageUrl={nft.ImageUrl} />
        <MainSection nft={nft} walletAddress={walletAddress} />
        <SummarySection nft={nft} />
      </div>
    </main>
  )
}

export default SingleAssetPage
