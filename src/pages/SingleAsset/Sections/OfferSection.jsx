import { useDispatch } from 'react-redux'
import { setLoading } from 'src/slices/loadingSlice'

import { isOwner } from 'src/utils/helper'
import { acceptOffer, cancelOffer } from 'src/utils/order'

const OfferSection = (props) => {
  const dispatch = useDispatch()

  const { nft, walletAddress } = props

  const handleCancelOffer = async (offer) => {
    dispatch(setLoading(true))

    try {
      await cancelOffer(
        nft.Collection?.ContractType,
        nft.Collection?.ContractAddress,
        nft.TokenId,
        offer,
        nft.Collection?.ChainId
      )
      dispatch(setLoading(false))
    } catch {
      dispatch(setLoading(false))
    }
  }

  const handleAcceptOffer = async (offer) => {
    dispatch(setLoading(true))

    try {
      await acceptOffer(
        nft.Collection?.ContractType,
        nft.Collection?.ContractAddress,
        nft.TokenId,
        offer,
        nft.Collection?.ChainId
      )
      dispatch(setLoading(false))
    } catch {
      dispatch(setLoading(false))
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Amount</th>
            <th>From</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {nft.Offers?.map((offer, index) => (
            <tr key={`offer${index}`}>
              <td>{offer.OfferPrice}</td>
              <td>{offer.OfferAmount}</td>
              <td>{offer.OfferAddress}</td>
              <td>
                {offer.OfferAddress?.toUpperCase() ===
                walletAddress?.toUpperCase() ? (
                  <button onClick={() => handleCancelOffer(offer)}>
                    Cancel
                  </button>
                ) : isOwner(nft.Owners, walletAddress) !== -1 ? (
                  <button onClick={() => handleAcceptOffer(offer)}>
                    Accept
                  </button>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default OfferSection
