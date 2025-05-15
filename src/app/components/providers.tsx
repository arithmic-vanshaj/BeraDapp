'use client';
// import react components
import * as React from 'react';
// import rainbowkit components
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi';
import { http } from 'wagmi';
import { 
  // mainnet,
  sepolia,
  berachainTestnet,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createPublicClient, type Chain } from 'viem'; // Import Chain type for clarity

// wallet connect
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!WALLETCONNECT_PROJECT_ID) {
    console.log(
        'WALLETCONNECT_PROJECT_ID is not set. Please set it in your .env file.'
    );
  }

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

// adding the supporting chains from wagmi
const supportedChains: readonly [Chain, ...Chain[]] = [
    // mainnet, //ethereum mainnet
    berachainTestnet,
    berachainbepolia,
    berachainmainnet,
    // zora,
    ...(process.env.NODE_ENV === 'development' ? [sepolia] : []), // Only include Sepolia in development
  ];

export const config = getDefaultConfig({ //wallet actions
    appName: "Beradapp",
    projectId: WALLETCONNECT_PROJECT_ID || 'wallet connect projectId not set',
    chains: supportedChains,
    transports: supportedChains.reduce((map, chain) => { map[chain.id] = http();
      return map;
    }, {} as Record<number, ReturnType<typeof http>>),
    ssr: true,
})

export const publicClient = createPublicClient({ // public actions
  chain: berachainmainnet,
  transport: http()
})

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
  
    return (
      <WagmiProvider config={config} >
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider modalSize="compact">
            {mounted && children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }
  