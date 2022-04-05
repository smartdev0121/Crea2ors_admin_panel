import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from 'src/slices/loadingSlice'

import { buyAsset, cancelListing, placeBid } from 'src/utils/order'
import { getDeltaTime, getOrderState, zeroPad } from 'src/utils/helper'

import MModal from 'src/components/MModal'

const ListingSection = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [modalVisible, setModalVisible] = useState(false)
  const [bidPrice, setBidPrice] = useState(0)
  const [curOrder, setCurOrder] = useState({})
  const [currentTime, setCurrentTime] = useState()

  const { orders, walletAddress, chainId } = props

  const handleCancelListing = async (order) => {
    dispatch(setLoading(true))

    try {
      await cancelListing(order, chainId)
      dispatch(setLoading(false))
      window.location.reload()
    } catch {
      dispatch(setLoading(false))
    }
  }

  const handleBuy = async (order) => {
    dispatch(setLoading(true))

    try {
      await buyAsset(order, chainId)
      dispatch(setLoading(false))
      history.push('/assets')
    } catch {
      dispatch(setLoading(false))
    }
  }

  const handlePlaceBid = (order) => {
    setModalVisible(true)
    setCurOrder(order)
  }

  const onPlaceBid = async (order) => {
    setModalVisible(false)
    dispatch(setLoading(true))

    try {
      await placeBid(order, bidPrice, chainId)
      dispatch(setLoading(false))
    } catch {
      dispatch(setLoading(false))
    }
  }

  const onCancelBid = () => {
    setModalVisible(false)
  }

  const onBidPriceChange = (order, bidPrice) => {
    if (curOrder.BuyerPrice >= bidPrice) return
    setBidPrice(bidPrice)
  }

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toISOString())
    }, 1000)
  }, [])

  return (
    <>
      {orders && orders.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>Quantity</th>
              <th>Max Bid Price</th>
              <th>Creator</th>
              <th>Time Left</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => {
              return (
                <tr key={`listing${index}`}>
                  <td>{order.Price}</td>
                  <td>{order.Amount}</td>
                  <td>{order.OrderType === 1 ? order.BuyerPrice : '#'}</td>
                  <td>
                    {getOrderState(order, walletAddress) === 1
                      ? 'You'
                      : order.Creator}
                  </td>
                  <td>
                    {order.OrderType === 1
                      ? getDeltaTime(
                          order.StartTime,
                          currentTime,
                          order.Duration
                        ) > 0
                        ? Array(3)
                            .fill(
                              getDeltaTime(
                                order.StartTime,
                                currentTime,
                                order.Duration
                              )
                            )
                            .map((val, ind) => {
                              return (
                                <span>
                                  {zeroPad(
                                    parseInt(val / Math.pow(60, 2 - ind)) % 60,
                                    2
                                  )}
                                  {ind !== 2 && ' : '}
                                </span>
                              )
                            })
                        : 'Finished'
                      : '#'}
                  </td>
                  <td>
                    {getOrderState(order, walletAddress) === 1 ? (
                      <button
                        onClick={() => {
                          handleCancelListing(order)
                        }}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={
                          getOrderState(order, walletAddress) === 2
                            ? () => handleBuy(order)
                            : () => handlePlaceBid(order)
                        }
                      >
                        {getOrderState(order, walletAddress) === 2
                          ? 'Buy Now'
                          : 'Place Bid'}
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      <MModal
        title='Place Bid'
        visible={modalVisible}
        onOk={(e) => onPlaceBid(curOrder)}
        onCancel={onCancelBid}
      >
        <input
          type='text'
          onChange={(e) => onBidPriceChange(curOrder, e.target.value)}
        />
      </MModal>
    </>
  )
}

export default ListingSection
