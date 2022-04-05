import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from 'src/slices/loadingSlice'

import { batchTransferAssets } from 'src/utils/contract'
import { getCurrentNetworkId } from 'src/utils/wallet'
import { apiGetCollectionInfo } from 'src/utils/api'

const BatchTransferPage = () => {
  const dispatch = useDispatch()

  const [address, setAddress] = useState('')
  const [collectionAddress, setCollectionAddress] = useState('')
  const [ids, setIds] = useState([])
  const [amounts, setAmounts] = useState([])

  const handleChangeIds = (value) => {
    const idArr = value.split('\n').map((id) => Number(id))
    setIds(idArr)
  }

  const handleChangeAmounts = (value) => {
    const amountArr = value.split('\n').map((amount) => Number(amount))
    setAmounts(amountArr)
  }

  const handleTransfer = async () => {
    dispatch(setLoading(true))
    try {
      const networkId = await getCurrentNetworkId()
      const res = await apiGetCollectionInfo(collectionAddress, networkId)
      await batchTransferAssets(
        res.ContractType,
        collectionAddress,
        res.ChainId,
        address,
        ids,
        amounts
      )
      dispatch(setLoading(false))
    } catch {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className='batch-transfer-card'>
      <h4>Batch Transfer NFTs</h4>
      <input
        placeholder='To Address'
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        placeholder='Collection Address'
        onChange={(e) => setCollectionAddress(e.target.value)}
      />
      <textarea
        placeholder={`NFT ID's`}
        onChange={(e) => handleChangeIds(e.target.value)}
      />
      <textarea
        placeholder={`Amounts(one amount per line, parallel to it's NFT ID`}
        onChange={(e) => handleChangeAmounts(e.target.value)}
      />
      <button type='primary' onClick={handleTransfer}>
        Transfer
      </button>
    </div>
  )
}

export default BatchTransferPage
