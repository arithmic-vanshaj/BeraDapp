'use client';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";
import { COMMON_ERC20_SYMBOLS, getTokenInfo } from "../trading/helper";

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
  } = useBalance({
    address: address,
    chainId: chain?.id || 80094
  });

  if (!isConnected || !address) {
    // This component should ideally only be rendered when connected,
    // but adding a fallback doesn't hurt.
    return <p>Please connect your wallet.</p>;
  }
    return (
<div className="relative p-6 bg-white dark:bg-[#3D2F29] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl transform transition duration-300 hover:-translate-y-1">
  {/* Top Accent Line */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-pink-500 rounded-t-2xl"></div>

  {/* Title */}
  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
    🧾 Wallet Overview
  </h2>

  {/* Address */}
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
      🔗 Connected Address
    </p>
    <code className="text-sm text-green-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md break-all block">
      {address}
    </code>
  </div>

  {/* Network */}
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
      🌐 Network
    </p>
    {chain ? (
      <p className="text-sm text-gray-900 dark:text-gray-200">
        {chain.name} ({chain.id})
      </p>
    ) : (
      <p className="text-sm italic text-gray-500 dark:text-gray-400">Unknown Network</p>
    )}
  </div>

  {/* Balance */}
  <div className="mb-6">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
      💰 Balance
    </p>
    {isBalanceLoading && (
      <p className="text-sm italic text-gray-500 dark:text-gray-400">Loading balance...</p>
    )}
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
        🔄 Refresh
      </button>
    )}
  </div>

  {/* Token Balances */}
  <div className="mb-6">
    <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-1">
      🧮 Token Balances
    </h3>
    <div className="space-y-1">
      {COMMON_ERC20_SYMBOLS.map((symbol) => (
        <TokenBalanceRow key={symbol} symbol={symbol} />
      ))}
    </div>
  </div>

  {/* Actions */}
  <div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">🛠️ Actions</p>
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        if (!connected) return null;

        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={openChainModal}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
            >
              🌍 Switch Network
            </button>
            <button
              onClick={openAccountModal}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition"
            >
              👤 Account / Disconnect
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