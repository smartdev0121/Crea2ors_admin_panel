const networks = {
  1: {
    chainId: '0x1',
    rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://etherscan.io/'],
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  56: {
    chainId: '0x38',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  137: {
    chainId: '0x89',
    rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
    blockExplorerUrls: ['https://explorer.matic.network/'],
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  250: {
    chainId: '0xfa',
    rpcUrls: ['https://rpc3.fantom.network', 'https://rpc.ftm.tools/'],
    blockExplorerUrls: ['https://ftmscan.com/'],
    chainName: 'Fantom',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
  },
  4: {
    chainId: '0x4',
    rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
    chainName: 'Rinkeby Test Network',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  3: {
    chainId: '0x3',
    rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://ropsten.etherscan.io/'],
    chainName: 'Ropsten Test Network',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  97: {
    chainId: '0x61',
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    chainName: 'BSC Test Network',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  80001: {
    chainId: '0x13881',
    rpcUrls: [
      'https://rpc-mumbai.matic.today/',
      'https://matic-mumbai.chainstacklabs.com',
      'https://rpc-mumbai.maticvigil.com/',
      'https://matic-testnet-archive-rpc.bwarelabs.com',
    ],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    chainName: 'Mumbai Test Network',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  4002: {
    chainId: '0xfa2',
    rpcUrls: ['https://rpc.testnet.fantom.network/'],
    blockExplorerUrls: ['https://testnet.ftmscan.com/'],
    chainName: 'Fantom Test Network',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
  },
}

export default networks
