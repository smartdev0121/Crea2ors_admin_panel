import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setLoading } from 'src/slices/loadingSlice'
import { apiCreateORUpdateAccount, apiGetAccountInfo } from 'src/utils/api'
import { getCurrentWalletAddress } from 'src/utils/wallet'

const EditAccountPage = () => {
  const dispatch = useDispatch()
  const [accountInfo, setAccountInfo] = useState({})

  const onAccountInfoChange = (e, type) => {
    if (type === 'file') {
      setAccountInfo((prevState) => ({ ...prevState, file: e.target.files[0] }))
    } else {
      setAccountInfo((prevState) => ({ ...prevState, [type]: e.target.value }))
    }
  }

  const handleSaveAccount = async () => {
    dispatch(setLoading(true))

    try {
      const wallet_address = await getCurrentWalletAddress()

      let res
      res = await apiCreateORUpdateAccount({
        ...accountInfo,
        Wallet: wallet_address,
      })
      setAccountInfo(res)
      dispatch(setLoading(false))
    } catch {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))

      try {
        const wallet_address = await getCurrentWalletAddress()
        const account_res = await apiGetAccountInfo(wallet_address)

        setAccountInfo(account_res)

        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, []) //eslint-disable-line

  return (
    <div className='edit-account-page'>
      <input
        placeholder='Username'
        value={accountInfo?.Name}
        onChange={(e) => onAccountInfoChange(e, 'Name')}
      />
      <textarea
        placeholder='Tell the world your story!'
        onChange={(e) => onAccountInfoChange(e, 'Description')}
      />
      <input type='file' onChange={(e) => onAccountInfoChange(e, 'file')} />
      <button onClick={handleSaveAccount}>Save</button>
    </div>
  )
}

export default EditAccountPage
