import { Chain } from "viem"

// adding berachain bepolia testnet 
const berachainbepolia: Chain = {
  id: 80069, // chain id 
  name: 'Berachain Bepolia Testnet',
  nativeCurrency:{
    symbol: 'BERA',
    name: 'Berachain Bepolia',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://bepolia.rpc.berachain.com/']}
  },
  testnet: true,
  blockExplorers: {
    default: { name: 'BeraBepoliaTrail', url: 'https://bepolia.beratrail.io/'}
  }
}

// adding berachain mainnet
const berachainmainnet: Chain = {
  id: 80094,
  name: 'Berachain Mainnet',
  nativeCurrency : {
    symbol: 'BERA',
    name: 'Berachain Mainnet',
    decimals: 18
  },
  rpcUrls: {default: { http: ['https://rpc.berachain.com/']} },
  testnet: false, 
  blockExplorers: {
    default: { name: 'Bera Scan', url: 'https://berascan.com/'}
  }
}

export {
    berachainbepolia, berachainmainnet
}