'use client';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";
import { COMMON_ERC20_SYMBOLS, getTokenInfo } from "../helper";

const TokenBalanceRow = ({ symbol }: { symbol: string }) => {
  const { address, isConnected, chain} = useAccount();
  const tokenInfo = getTokenInfo(symbol);

  const { data, isLoading, isError } = useBalance({
    address: address, 
    token: tokenInfo?.address,
    chainId: chain?.id || 80094, //default to berachain mainnet
    query: {
      enabled: isConnected && !!address && !!tokenInfo?.address,
    }
  });

  if (!tokenInfo) return null; // Should not happen if symbol list is correct

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tokenInfo.symbol}</span>
      {isLoading && <span className="text-xs italic text-gray-500 dark:text-gray-400">Loading...</span>}
      {isError && <span className="text-xs text-red-500">Error</span>}
      {data && !isLoading && !isError && (
        <span className="text-sm font-mono text-gray-900 dark:text-gray-200">
          {/* Format manually for consistent decimal places */}
          {parseFloat(formatUnits(data.value, tokenInfo.decimals)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
        </span>
      )}
      {!data && !isLoading && !isError && <span className="text-xs text-gray-400">-</span>}
    </div>
  );
};

const WalletConnectInfo = () => {
  const { address, chain, isConnected } = useAccount();
  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    refetch: refetchBalance,
  } = isConnected && address
    ? useBalance({ address })
    : { data: null, isLoading: false, refetch: () => {} };

  if (!isConnected || !address) {
    // This component should ideally only be rendered when connected,
    // but adding a fallback doesn't hurt.
    return <p>Please connect your wallet.</p>;
  }
    return (
    <div className="p-6 bg-white dark:bg-[#3D2F29]  rounded-lg shadow border border-gray-200 dark:border-gray-700 h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Wallet Details</h2>

      {/* Address */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Connected Address</p>
        <code className="text-sm text-green-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded break-all">
          {address}
        </code>
      </div>

      {/* Network */}
      <div className="mb-4">
         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Network</p>
         {chain ? (
             <p className="text-sm text-gray-900 dark:text-gray-200">
                 {chain.name} ({chain.id})
             </p>
         ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">Unknown Network</p>
         )}
      </div>

      {/* Balance */}
      <div className="mb-6">
         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Balance</p>
         {isBalanceLoading && <p className="text-sm italic text-gray-500 dark:text-gray-400">Loading balance...</p>}
          {balanceData && (
              <p className="text-lg font-semibold text-green-900 dark:text-green-200">
                  {parseFloat(balanceData.formatted).toFixed(5)} {balanceData.symbol}
              </p>
          )}
          {!isBalanceLoading && (
             <button
                 onClick={() => refetchBalance()}
                 className="mt-2 cursor-pointer text-xs text-blue-600 dark:text-blue-400 hover:underline"
             >
                 Refresh
             </button>
          )}
      </div>

      {/* Balances of other tokens */}
       <div className="mb-6 flex-grow"> {/* Added flex-grow */}
        <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300 pt-3 border-t border-gray-200 dark:border-gray-700">
           Token Balances
        </h3>
        <div className="space-y-1">
          {COMMON_ERC20_SYMBOLS.map((symbol) => (
            <TokenBalanceRow key={symbol} symbol={symbol} />
          ))}
        </div>
      </div>

      {/* Actions (Network Switch / Disconnect) */}
      <div>
         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Actions</p>
          {/* Using ConnectButton parts for specific actions */}
         <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, mounted }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              if (!connected) {
                 return null; // Should not happen if rendered correctly
               }

              return (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={openChainModal} // Opens network switcher
                    type="button"
                    className="w-full cursor-pointer sm:w-auto px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Switch Network
                  </button>
                  <button
                     onClick={openAccountModal} // Opens disconnect/copy address modal
                     type="button"
                     className="w-full cursor-pointer sm:w-auto px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-red-700 hover:bg-red-50 dark:hover:bg-red-600"
                  >
                     Account / Disconnect
                  </button>
                </div>
              );
            }}
          </ConnectButton.Custom>
      </div>
    </div>
    )
}

export default WalletConnectInfo