'use client';
import { config } from '@/app/dapp/providers';
import { publicClient } from '@/app/dapp/viem/viemPublicClient';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';
import { Address } from 'viem';
import { useAccount } from 'wagmi';
import strategyHandler from './strategyHandler';

type strategyModal = {
  strategyName: string;
  description: string;
  apr: number | string;
  yield_tag: string;
};

type StrategyInfoModal = {
  show: boolean;
  onClose: () => void;
  strategy: strategyModal
};

async function executeStrategy(
  strategy: string,
  inputAmount: string,
  reqTokenAddress: `0x${string}`,
  address: Address,
  vaultAddress: Address,
  slippagePercent: number
) {

  console.log("executeStrategy inputs:", {
    strategy,
    inputAmount,
    reqTokenAddress,
    address,
    vaultAddress,
    slippagePercent
  });

  const balance = await publicClient.getBalance({ address });
  const tokenBalance = Number(balance);

  const currentTokenAddress: `0x${string}` = `0x{string}`;

  try {
    // Call the execute strategy from the frontend
    // If needed, swap. Call and await the swap result
    const response = await strategyHandler(
      strategy,
      inputAmount,
      reqTokenAddress,
      currentTokenAddress,
      address,
      tokenBalance,
      vaultAddress,
      slippagePercent
    );

    // const data = await response.json();

    // if (data.status !== 200) {
    //   throw new Error(data.error || "Internal Server Error");
    // }

    // return { hash: data.hash, rctp: data.rctp, error: data.error || null };
  } catch (error) {
    console.error("Error in executing strategy: ", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

const StrategyInfoModal: React.FC<StrategyInfoModal> = ({ show, onClose, strategy }) => {
  const [inputAmount, setInputAmount] = useState('');
  const [slippage, setSlippage] = useState('');
  const {isConnected, chain, address} = useAccount({config});
  const {openConnectModal} = useConnectModal();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{hash?: string; rctp?: string; error?: string, errorMessage?: string} | null>(null);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(67, 37, 37, 0.5)] flex items-center justify-center">
      <div className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-lg shadow-xl relative">
      <button
        className="absolute top-3 right-4 text-gray-400 hover:text-white"
        onClick={onClose}
      >
        ✕
      </button>

      <h2 className="text-2xl font-semibold mb-2">{strategy.strategyName}</h2>
      <p className="text-sm text-gray-400 mb-4">{strategy.description}</p>
 
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <span className="block text-sm text-gray-500">APR</span>
          <span className="text-green-400 text-xl font-bold">{strategy.apr}%</span>
        </div>
        <div>
          <label htmlFor="slippage" className="block text-sm text-gray-500 mb-1">
            Enter slippage
              </label>
              <input
            id="slippage"
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={slippage}
            onChange={(e) => setSlippage(e.target.value)}
            placeholder="0.01"
            className="w-24 px-2 py-1 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring focus:ring-green-500"
              />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="amount" className="block text-sm text-gray-400 mb-1">
        Enter Amount
        </label>
        <input
        id="amount"
        type="number"
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
        placeholder="0.0"
        className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring focus:ring-green-500"
        />
      </div>

        <button
          className="w-full bg-green-600 hover:bg-green-500 py-2 px-4 rounded-lg font-semibold flex items-center justify-center"
          onClick={async () => {
            if (isConnected) {
                setLoading(true);
                setResult(null);
              try {
                  // executing strategy
                  const reqTokenAddress = '0xpseudoTokenAddress';
                  const vaultAddress = '0xFalseVaultAddress';

                  const res = await executeStrategy(
                    strategy.strategyName, 
                    `0x${inputAmount}`, 
                    reqTokenAddress, 
                    address as Address, 
                    vaultAddress, 
                    Number(slippage)
                  ); //account address
                  setResult(res ?? null);
                } catch (err) {
                  const errorMsg = (err instanceof Error) ? err.message : String(err);
                  setResult({ error: errorMsg });
                } finally {
                  setLoading(false);
                }
            } else {

              alert("Connect Wallet");
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : null}
          {loading ? "Executing..." : "Execute Strategy"}
        </button>
        {result && (
          <div className="mt-4 bg-gray-800 p-3 rounded text-sm">
            {result.error ? (
              <span className="text-red-400">{result.error + "" + result.errorMessage}</span>
            ) : (
              <>
                <div><span className="font-semibold"> Strategy Executed: </span></div>
                <div><span className="font-semibold"> Hash:</span> {result.hash}</div>
                <div><span className="font-semibold"> RCTP:</span> {result.rctp}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyInfoModal;
