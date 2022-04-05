import { CONTRACT_TYPE } from 'src/config/global'
import { getExplorerUrl } from 'src/utils/config'
import networks from 'src/config/network'

const DetailsBox = (props) => {
  const { nft } = props
  return (
    <>
      <span>
        Contract Address:{' '}
        <a
          href={`${getExplorerUrl(nft.Collection?.ChainId) + nft.Collection?.ContractAddress}`}
          target='_blank'
          rel='noreferrer'
          className='contract-address'
        >
          {nft.Collection?.ContractAddress}
        </a>
      </span>
      <span>Token ID: {nft.TokenId}</span>
      <span>
        Token Standard:{' '}
        {nft.Collection?.ContractType === CONTRACT_TYPE.ERC721 ? 'ERC721' : 'ERC1155'}
      </span>
      <span>
        Blockchain: {nft.Collection?.ChainId && networks[nft.Collection?.ChainId]?.chainName}
      </span>
    </>
  )
}

export default DetailsBox