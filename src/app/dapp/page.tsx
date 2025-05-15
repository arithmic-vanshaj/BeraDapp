'use client';
import { useAccount } from "wagmi";
import BeraAITrader from "../trading/trading";
import WalletConnectInfo from "../components/walletconnectinfo";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Portfolio() {
    const {isConnected, chain} = useAccount(); // get the address and connection status
    const isConnectedToBerachain = isConnected && (chain?.id === 80069 || chain?.id === 80085 || chain?.id === 80094);
    // console.log("chain id: ", chain?.id)
    const BeraChainNetwork = "Bera Chain Network"

    return (
        <div> 
      {!isConnected && (
        // State 1: Disconnected - Show Connect Button Centered
        <div className="flex flex-col items-center justify-center pt-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Welcome to BeraFolio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Connect your wallet using WalletConnect or other providers to continue.
          </p>
          {/* Using RainbowKit's button handles WalletConnect automatically */}
          <ConnectButton label="Connect Wallet" />
        </div>
      )}

      {isConnected && (
        // State 2: Connected - Show Two Columns or Network Warning
        <>
          {!isConnectedToBerachain && (
             // Sub-State: Connected but WRONG network
             <div className="mt-10 text-center p-6 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 rounded-lg max-w-lg mx-auto">
                <h2 className="text-xl font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Network Alert</h2>
                <p className="text-yellow-700 dark:text-yellow-300 mb-4">
                    Please switch your wallet network to <span className="font-bold"> {BeraChainNetwork} </span> to use the strategy selector.
                </p>
                {/* The ConnectButton in Navbar or WalletInfo can handle the switch */}
                 <ConnectButton.Custom>
                    {({ openChainModal }) => (
                       <button
                           onClick={openChainModal}
                           className="px-4 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-sm"
                        >
                           Switch to {BeraChainNetwork}
                       </button>
                    )}
                 </ConnectButton.Custom>
             </div>
           )}

          {isConnectedToBerachain && (
            <div className="flex flex-col lg:flex-row gap-8 mt-6 justify-center">
              {/* Left Column: Wallet Info */}
              <div className="w-full lg:w-1/3 flex-shrink-0">
                 <WalletConnectInfo />
              </div>

              {/* Right Column: Trading Window (Strategy Selector) */}
              <div className="w-full lg:w-2/3">
                <BeraAITrader />
              </div>
            </div>
          )}
        </>
      )}
    </div>
    )
    
}