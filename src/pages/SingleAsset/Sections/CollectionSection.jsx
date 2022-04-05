import { Link } from 'react-router-dom'
import {
  FaRegEdit,
  FaTrashAlt,
  FaGift,
  FaExternalLinkAlt,
  FaMaxcdn,
} from 'react-icons/fa'

import { CONTRACT_TYPE } from 'src/config/global'
import { isOwner } from 'src/utils/helper'

const CollectionSection = (props) => {
  const {
    nft,
    walletAddress,
    handleEdit,
    handleTransfer,
    handleBurn,
    handleExternalLink,
    handleMint,
  } = props

  return (
    <section className='item-header'>
      <div className='item-collection-info'>
        <Link
          to={`/collection/${nft.Collection?.ChainId}/${nft.Collection?.ContractAddress}`}
        >
          {nft.Collection?.CollectionName}
        </Link>
        <div className='item-collection-toolbar'>
          {nft.Collection?.Wallet?.toUpperCase() ===
            walletAddress?.toUpperCase() && (
            <>
              <div onClick={handleEdit}>
                <FaRegEdit />
              </div>

              {nft.Collection?.ContractType === CONTRACT_TYPE.ERC1155 && (
                <div onClick={handleMint}>
                  <FaMaxcdn />
                </div>
              )}
            </>
          )}
          {isOwner(nft.Owners, walletAddress) !== -1 && (
            <>
              <div onClick={handleBurn}>
                <FaTrashAlt />
              </div>

              <div onClick={handleTransfer}>
                <FaGift />
              </div>
            </>
          )}
          <div onClick={handleExternalLink}>
            <FaExternalLinkAlt />
          </div>
        </div>
      </div>
      <h2>{nft.Name}</h2>
    </section>
  )
}

export default CollectionSection
