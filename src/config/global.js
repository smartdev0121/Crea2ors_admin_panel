export const CONTRACT_TYPE = {
  ERC721: 0,
  ERC1155: 1,
  ERC20: 2,
}

export const TRANSACTION_TYPE = [
  'ContractDeployed',
  'TokenURIChanged',
  'ContractURIChanged',
  'Transfer',
  'Listing(Fixed)',
  'Listing(Timed Auction)',
  'SellCanceled',
  'SellFinished',
  'AuctionCanceled',
  'AuctionFinished',
  'TransferSingle',
  'TransferBatch',
  'Bid',
  'OfferMade',
  'OfferAccepted',
  'OfferCanceled',
]

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'