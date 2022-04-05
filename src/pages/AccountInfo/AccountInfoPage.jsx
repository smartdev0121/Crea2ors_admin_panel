import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setLoading } from 'src/slices/loadingSlice'
import { apiGetAccountInfo, apiGetOwnerAssets } from 'src/utils/api'

import MNFTItem from 'src/components/MNFTItem'
import { getCurrentWalletAddress } from 'src/utils/wallet'

const AccountInfoPage = () => {
  const dispatch = useDispatch()

  const [assets, setAssets] = useState([])
  const [accountInfo, setAccountInfo] = useState({})

  const { address } = useParams()

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))
      try {
        const wallet_address = await getCurrentWalletAddress()
        let user_address = address ? address : wallet_address

        const assets_res = await apiGetOwnerAssets(user_address)
        const account_res = await apiGetAccountInfo(user_address)

        setAccountInfo(account_res)
        setAssets(assets_res)
        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, [address, dispatch])

  return (
    <div className='account-info-page'>
      <div className='account-info'>
        <div className='account-avatar'>
          <img src={accountInfo?.PhotoStorageKey} alt='avatar' />
        </div>
        {!address && <Link to='/account/settings'>Edit</Link>}
      </div>
      <div className='asset-list'>
        {assets?.map((asset, ind) => (
          <MNFTItem key={`asset${ind}`} nft={asset} />
        ))}
      </div>
    </div>
  )
}

export default AccountInfoPage
