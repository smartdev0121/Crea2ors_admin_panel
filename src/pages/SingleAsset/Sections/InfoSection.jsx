import { FaUserFriends, FaUserTie, FaAtlas } from 'react-icons/fa'
import { getOwnCount } from 'src/utils/helper'

const InfoSection = (props) => {
  const { nft, walletAddress } = props

  return (
    <section className='item-info'>
      <p>
        <FaUserFriends /> {nft.Owners?.length} Owners
      </p>
      <p>
        <FaAtlas /> {nft.Amount} Total
      </p>
      <p>
        <FaUserTie /> You own {getOwnCount(nft.Owners, walletAddress)}
      </p>
    </section>
  )
}

export default InfoSection
