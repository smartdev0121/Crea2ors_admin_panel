import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from 'src/slices/loadingSlice'
import { Tabs } from 'antd'

import { createOrder } from 'src/utils/order'
import { apiGetAsset } from 'src/utils/api'
import { CONTRACT_TYPE } from 'src/config/global'
import { getTokenInfo } from 'src/utils/contract'

import MNFTItem from 'src/components/MNFTItem'

const { TabPane } = Tabs

const SellAssetPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [asset, setAsset] = useState({})
  const [orderType, setOrderType] = useState(0)
  const [orderState, setOrderState] = useState({
    price: 0,
    duration: 0,
    amount: 1,
    currencyTokenAddress: '0x0000000000000000000000000000000000000000',
    currencyTokenSymbol: 'ETH',
    currencyTokenDecimals: 18,
  })

  const { address, tokenId, chainId } = useParams()

  const handleOrderTypeChange = (e) => {
    setOrderType(e)
  }

  const handleOrder = async () => {
    dispatch(setLoading(true))
    try {
      await createOrder(
        asset.Collection?.ContractType,
        asset.Collection?.ContractAddress,
        asset.Collection?.ChainId,
        asset.TokenId,
        orderState.amount,
        orderState.price,
        orderState.currencyTokenAddress,
        orderState.currencyTokenDecimals,
        orderState.duration,
        orderType
      )

      history.goBack()
      dispatch(setLoading(false))
    } catch {
      dispatch(setLoading(false))
    }
  }

  const handlePriceUnitChange = async (e) => {
    const { symbol, decimals } = await getTokenInfo(e.target.value)

    if (symbol === null) {
      alert('Invalid ERC20 Token address')
      return
    }

    setOrderState((prevState) => ({
      ...prevState,
      currencyTokenAddress: e.target.value,
      currencyTokenSymbol: symbol,
      currencyTokenDecimals: decimals,
    }))
  }

  const onOrderStateChange = (value, key) => {
    setOrderState((prevOrderState) => ({ ...prevOrderState, [key]: value }))
  }

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))
      try {
        const res = await apiGetAsset(address, chainId, tokenId)
        setAsset(res)
        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, [address, chainId, tokenId, dispatch])

  return (
    <div className='sell-asset-card'>
      <section className='sell-info'>
        <h3>List Items for sale</h3>
        <Tabs onChange={handleOrderTypeChange}>
          <TabPane tab='Fixed Price' key={0}>
            <section>
              {asset.Collection?.ContractType === CONTRACT_TYPE.ERC1155 && (
                <>
                  <h5>Quantity</h5>
                  <input
                    type='text'
                    onChange={(e) =>
                      onOrderStateChange(e.target.value, 'amount')
                    }
                  />{' '}
                </>
              )}
              <h5>Price</h5>
              <input
                type='text'
                onChange={(e) => onOrderStateChange(e.target.value, 'price')}
              />
              <h5>Token Unit Address</h5>
              <input type='text' onChange={(e) => handlePriceUnitChange(e)} />
              <label>{orderState.currencyTokenSymbol}</label>
            </section>
          </TabPane>
          <TabPane tab='Timed Auction' key={1}>
            <>
              <section>
                {asset.Collection?.ContractType === CONTRACT_TYPE.ERC1155 && (
                  <>
                    <h5>Quantity</h5>
                    <input
                      type='text'
                      onChange={(e) =>
                        onOrderStateChange(e.target.value, 'amount')
                      }
                    />
                  </>
                )}
                <h5>Starting Price</h5>
                <input
                  type='text'
                  onChange={(e) => onOrderStateChange(e.target.value, 'price')}
                />
              </section>
              <section>
                <h5>Duration</h5>
                <input
                  type='text'
                  placeholder='In minutes'
                  onChange={(e) =>
                    onOrderStateChange(e.target.value, 'duration')
                  }
                />
              </section>
              <section>
                <h5>Token Unit Address</h5>
                <input type='text' onChange={(e) => handlePriceUnitChange(e)} />
                <label>{orderState.currencyTokenSymbol}</label>
              </section>
            </>
          </TabPane>
        </Tabs>
        <button onClick={handleOrder}>Complete listing</button>
      </section>
      <section className='asset-info'>
        <MNFTItem nft={asset} />
      </section>
    </div>
  )
}

export default SellAssetPage
