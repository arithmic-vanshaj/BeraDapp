'use client';
import React, { useState, useEffect}  from "react";
import { useAccount, useBalance, useWalletClient } from "wagmi";
import { BalancerApi, TokenAmount, SwapKind, Swap, Slippage } from "@berachain-foundation/berancer-sdk";
import { waitForTransactionReceipt } from "viem/actions";
// import { createPublicClient, erc20Abi, http, parseEther } from "viem";
import { BeraToken, HoneyToken } from "./tokens";
import { BERA_TOKEN_ADDRESS, BERACHAIN_BASE_API, honey_abi, reward_vault_abi, RPC_URL, VAULT_ADDRESS, WBERA_TOKEN_ADDRESS } from "../constants/constant";
import { config, publicClient } from "../providers";
import { parseEther } from "viem";

type Strategy = 'high' | 'slow' | 'safe' | null; 

// mocks data structure for swapping
// interface BeraPools{
//   poolid: string, 
//   poolapr: number,
//   pooltvl: number,
//   isRewardVault: boolean,
//   isVolatile: boolean,

// }
interface MockPool{
    id: string;
    name: string; // e.g., "BERA / HONEY Pool"
    tokens: [string, string]; // Symbols of tokens in the pool
    bgtapr: number; // 
    volumeRank: number; // Lower is higher volume (example: 1 = highest)
    stability: 'High' | 'Medium' | 'Low'; 
    requiredTokens: string[]; // Tokens user might need to swap *into*
    poolContract: string; // address of the pool contract 
}

// suggestion structure for pools
interface UserSuggestion {
    pool: MockPool;
    reason: string;
}

const MOCK_POOLS: MockPool[] = [
    {
        id: 'pool1', name: 'BYUSD | HONEY', tokens: ['BYUSD', 'HONEY'], bgtapr: 3.31, volumeRank: 1, stability: 'Low', requiredTokens: ['BYUSD', 'HONEY'],
        poolContract: "0xde04c469ad658163e2a5e860a03a86b52f6fa8c8"
    },
    {
        id: 'pool2', name: 'WBERA | iBERA', tokens: ['WBERA', 'IBERA'], bgtapr: 60.50, volumeRank: 4, stability: 'High', requiredTokens: ['WBERA', 'IBERA'],
        poolContract: "0x62C030B29a6Fef1B32677499e4a1F1852a8808c0"
    },
    {
        id: 'pool3', name: 'WETH - beraETH', tokens: ['WETH', 'beraETH'], bgtapr: 10.87, volumeRank: 3, stability: 'Medium', requiredTokens: ['WETH', 'beraETH'],
        poolContract: "0x62C030B29a6Fef1B32677499e4a1F1852a8808c0"
    },
    {
        id: 'pool4', name: 'USDC.e | HONEY', tokens: ['USDC.e', 'HONEY'], bgtapr: 0.13, volumeRank: 2, stability: 'Low', requiredTokens: ['HONEY', 'USDC.e'],
        poolContract: "0x62C030B29a6Fef1B32677499e4a1F1852a8808c0"
    },
  ];
  
// 
export default function BeraAITrader() {
    const { address, chain} = useAccount();
    const [selectedStrategy, setSelectedStrategy] = useState<Strategy>(null);
    const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    //
    const [isWrapping, setIsWrapping] = useState(false);
    const [isSwapping, setIsSwapping] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [error, setError] = useState('');
    const [txStatus, setTxStatus] = useState('');

    const chainid = chain?.id || 80094; 
    const inToken = BeraToken; // in token
    const outToken = HoneyToken; // out token after swap
    const tokenAbi = honey_abi;
    const amount = "0.01"
  
    // Fetch user's BERA balance if connected
    const { data: beraBalance } =  useBalance({
            address: address,
            token: (BERA_TOKEN_ADDRESS || "BERA TOKEN ADDRESS NOT FOUND") as `0x${string}`,
        });

    // Function to generate suggestions based on strategy (using mock data)
    const generateSuggestions = (strategy: Strategy) => {
      if (!strategy) {
        setSuggestions([]);
        return;
      }
  
      setIsLoadingSuggestions(true);
      // Simulate API call delay
      setTimeout(() => {
        let filteredPools: MockPool[] = [];
  
        switch (strategy) {
          case 'high':
            // Suggest top 2 highest APR pools
            filteredPools = [...MOCK_POOLS].sort((a, b) => b.bgtapr - a.bgtapr).slice(0, 2);
            break;
          case 'slow':
            // Suggest top 2 highest volume pools (lowest rank) with moderate bgtapr
            filteredPools = [...MOCK_POOLS]
              .filter(p => p.bgtapr < 100) // Example threshold for "slow"
              .sort((a, b) => a.volumeRank - b.volumeRank)
              .slice(0, 2);
            break;
          case 'safe':
            // Suggest top 2 most stable pools
            filteredPools = [...MOCK_POOLS]
              .filter(p => p.stability === 'High')
              .sort((a, b) => a.volumeRank - b.volumeRank) // Prioritize higher volume among stable ones
              .slice(0, 2);
            break;
          default:
            filteredPools = [];
        }
  
        const poolSuggestions = filteredPools.map(pool => ({
          pool: pool,
          reason: getReason(strategy, pool),
        }));
  
        setSuggestions(poolSuggestions);
        setIsLoadingSuggestions(false);
      }, 500); // 0.5 second delay
    };
  
    // Helper to generate reason text
    const getReason = (strategy: Strategy, pool: MockPool): string => {
      switch (strategy) {
        case 'high': return `High APR (${pool.bgtapr.toFixed(1)}%)`;
        case 'slow': return `High Volume (Rank ${pool.volumeRank}) & Moderate APR`;
        case 'safe': return `Historically Stable (${pool.stability}) & Decent Volume (Rank ${pool.volumeRank})`;
        default: return '';
      }
    };
  
    // Re-generate suggestions when strategy changes
    useEffect(() => {
      generateSuggestions(selectedStrategy);
    }, [selectedStrategy]);
  
    const handleStrategySelect = (strategy: Strategy) => {
      setSelectedStrategy(strategy);
    }

    // creating a wallet client to connect and handle transactions
    const {data: walletClient} = useWalletClient({
      account: address,
      chainId: chainid,
      config,
    });
    console.log("walletClient", walletClient);
    if (!walletClient) {
      console.log("Wallet client is not available.");
      return;
    }

    // new api constructor 
    const balancerApi = new BalancerApi(BERACHAIN_BASE_API, chain?.id || 80094);
    
    // // wrapping function 
      const wrapToken = async () => {
       // checking the gasPrice
      const gasPrice = await publicClient.getGasPrice();
      const adjustedGasPrice = (BigInt(gasPrice) * BigInt(120)) / BigInt(100); 
      console.log("Adjusted gas price: ", adjustedGasPrice);
      
      console.log("starting the wrapping ")
      const [address] = await walletClient.getAddresses();

      setIsWrapping(true);
      setError('');
      setTxStatus(" Starting the wrapping ");

      try {
          const gasLimit = await publicClient.estimateContractGas({
              address: WBERA_TOKEN_ADDRESS,
              abi: tokenAbi,
              functionName: 'deposit',
              account: address,
              value: parseEther(amount),
          })

          console.log("Estimated gas limit: ", gasLimit);

          const { request } = await publicClient.simulateContract({
              address: WBERA_TOKEN_ADDRESS,
              abi: tokenAbi,
              functionName: 'deposit',
              account: address,
              value: parseEther(amount),
              gas: BigInt(1000000),
              gasPrice: adjustedGasPrice,
          });

          console.log("simulated request: ", request);
          console.log(" started with the write contract ")

          const hash = await walletClient.writeContract(request);

          setTxHash(hash);
          setTxStatus(" Transaction sent, waiting for confirmation...");

          const receipt = await publicClient.waitForTransactionReceipt({
              hash, 
              retryCount: 3,
              timeout: 60_000, // 1 minute timeout

          });
          console.log("Tx receipt: ", receipt);

          if (receipt.status === "success"){
              setTxStatus ("Transaction confirmed!")
          }
          else {
              setTxStatus("Transaction completed but may have failed. Please check your wallet")
          }
          return hash;
      }
      catch (error) {
          console.error(" Error in wrapping BERA: ", error)
          setError(error instanceof Error ? error.message : 'Unknown error occurred');
          setTxStatus('');
      }finally{
          setIsWrapping(isWrapping);
      }
    }

    // swapping function
    const swapToken = async () => {
      // wrap the BERA token first
      const wrapHash = await wrapToken();
      console.log("wrapHash: ", wrapHash);

      setIsSwapping(true);
      setError('');
      setTxStatus(" Preparing swap");

      try {
        // checking the gasPrice
        const gasPrice = await publicClient.getGasPrice();
        const adjustedGasPrice = (BigInt(gasPrice) * BigInt(120)) / BigInt(100); 
        console.log("Adjusted gas price: ", adjustedGasPrice);
        // create swap amount 
        const swapAmount = TokenAmount.fromHumanAmount(inToken, `${parseFloat(amount)}` as `${number}`);
        console.log("swapAmount: ", swapAmount);
        
        // fetch optimal swap paths
        const { paths: sorPaths } = await balancerApi.sorSwapPaths.fetchSorSwapPaths({
          chainId: chainid,
          tokenIn: inToken.address,
          tokenOut: outToken.address,
          swapKind: SwapKind.GivenIn,
          swapAmount: swapAmount,
        });

        console.log("sorPaths: ", sorPaths);
        if (sorPaths.length === 0){
          console.log("NO paths found to Swap Token")
        }

        // // assets
        // const assets = Array.from(new Set(routes.flatMap(route =>
        //   route.hops.flatMap(hop => [hop.tokenIn, hop.tokenOut])
        // ))) as `0x${string}`[];
        // // swaps
        // const batchSwaps = routes.flatMap(route => route.hops.map((hop, index) => ({
        //     poolId: hop.poolId as `0x${string}`,
        //     assetInIndex: BigInt(assets.indexOf(hop.tokenIn as `0x${string}`)),
        //     assetOutIndex: BigInt(assets.indexOf(hop.tokenOut as `0x${string}`)),
        //     amount: index === 0 ? BigInt(swapAmount.amount) : BigInt(0),
        //     userData: '0x' as `0x${string}`
        //   }))
        // );
        // funds
        const funds = {
          sender: address as `0x${string}`,
          recipient: address as `0x${string}`,
          fromInternalBalance: false,
          toInternalBalance: false
        };

        // // limits
        // const BatchLimits = assets.map((_, i) =>
        //   i === 0 ? swapAmount.amount : -MAX_UINT256 // Note: `limits` is int256[]          
        // );
        // deadline
        const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600);

        const swapTxn = new Swap({
          chainId: chainid, 
          paths: sorPaths, 
          swapKind: SwapKind.GivenIn, 
          userData: '0x',
        });

         // // // Query current rates
         const queryOutput = await swapTxn.query(RPC_URL);
         console.log("queryOutput: ", queryOutput);
 
         // // Build transaction with 0.5% slippage
         const slippage = Slippage.fromPercentage("0.5");
         console.log("slippage: ", slippage);
 

        // console.log("assets: ", assets);
        // console.log("swaps: ", swaps);
        // console.log("funds: ", funds);
        // console.log("limits: ", limits);

        // converting into batch swapping 
        // const batchSwap = {
        //     kind: SwapKind.GivenIn,
        //     assets: assets,
        //     swaps: swaps,
        //   funds: funds,
        //   limits: limits,
        //   deadline: deadline,
        // };
        // console.log("batchSwap: ", batchSwap);
        const poolId = "0xf961a8f6d8c69e7321e78d254ecafbcc3a637621000000000000000000000001"

        const singleSwap = {
          poolId: poolId as `0x${string}`,
          kind: 0,
          assetIn: inToken.address as `0x${string}`,
          assetOut: outToken.address as `0x${string}`,
          amount: BigInt(swapAmount.amount),
          userData: "0x" as `0x${string}`,
        }

        const limit = BigInt(1); // no limit 

        const {request} = await publicClient.simulateContract({
          address: VAULT_ADDRESS,
          abi: reward_vault_abi,
          functionName: 'swap',
          args: [singleSwap, funds, limit, deadline],
          account: address,
        })

        // approve spending
        const swapTxnHash = await walletClient.writeContract(request);

        // // send transaction 
        // const batchTxnHash = await walletClient.writeContract({
        //   address: "0x4Be03f781C497A489E3cB0287833452cA9B9E80B", // vault address
        //   abi: reward_vault_abi,
        //   functionName: 'batchSwap',
        //   args: [
        //     batchSwap.kind,
        //     batchSwap.swaps,
        //     batchSwap.assets,
        //     batchSwap.funds,
        //     batchSwap.limits.map(limit => BigInt(limit)),
        //     batchSwap.deadline,
        //   ],
        //     account: address
        // });

        console.log("swapTxnHash: ", swapTxnHash);

        const receipt = await waitForTransactionReceipt(walletClient, {hash: swapTxnHash})
        console.log("Transaction receipt: ", receipt);
        if (receipt.status === "success"){
          console.log("Transaction confirmed!");
          setTxStatus("Transaction confirmed!");
          setIsSwapping(isSwapping);
          setTxHash(txHash);
          setError(error)
        }else{
          console.log("Transaction failed or reverted.");
          setTxStatus("Transaction completed but may have failed. Please check your wallet");
        }

        // const callData = swapTxn.buildCall({
        //   slippage,
        //   deadline,
        //   queryOutput,
        //   sender: address,
        //   recipient: address,
        //   wethIsEth: false,
        // });
        
        // // // send transaction
        // const txHash = await sendTransaction(walletClient, {
        //   to: callData.to, data: callData.callData, value: callData.value
        // });
        // check if the transaction is null
        // if (!txHash) {
        //   console.error("Transaction is null.");
        //   return;
        // }
        // console.log("Transaction sent: ", txHash);

      } catch (error) {
        console.log(" Error in swapping: ", error);
        setError(error instanceof Error ? error.message : 'Error occurred');
        setTxStatus(txStatus)
      }
    }
   // what it returns
    return (
      <div className="w-full max-w-2xl p-6 bg-white dark:bg-[#2F2B27] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all">
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-900 dark:text-white">
          🧠 Berachain Strategy Selector
        </h2>

        {/* BERA Balance */}
        {beraBalance && (
          <p className="text-sm text-center mb-6 text-gray-600 dark:text-gray-400">
            Your BERA Balance: <span className="font-semibold text-amber-600 dark:text-yellow-400">{parseFloat(beraBalance.formatted).toFixed(4)} {beraBalance.symbol}</span>
          </p>
        )}

        {/* Strategy Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Choose Your Growth Strategy:</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => handleStrategySelect('high')}
              className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition-all duration-200 border ${
                selectedStrategy === 'high'
                  ? 'bg-red-500 text-white border-red-600 dark:bg-red-600 dark:border-red-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              🚀 High Growth
            </button>
            <button
              disabled
              onClick={() => handleStrategySelect('slow')}
              className="w-full sm:w-auto px-6 py-2 rounded-lg font-medium border opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            >
              🐢 Slow Growth (soon)
            </button>
            <button
              disabled
              onClick={() => handleStrategySelect('safe')}
              className="w-full sm:w-auto px-6 py-2 rounded-lg font-medium border opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            >
              🛡️ Safe Growth (soon)
            </button>
          </div>
        </div>

        {/* Suggestions Area */}
        <div className="mt-6 min-h-[160px]">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">🔍 Suggested Pools & Swaps:</h3>

          {isLoadingSuggestions && (
            <div className="flex justify-center items-center p-6">
              <p className="text-gray-500 dark:text-gray-400 italic">Looking for optimal strategies...</p>
            </div>
          )}

          {!isLoadingSuggestions && selectedStrategy && suggestions.length === 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
              <p className="text-gray-600 dark:text-gray-300">No specific pools found matching the criteria with current data.</p>
            </div>
          )}

          {!isLoadingSuggestions && suggestions.length > 0 && (
            <div className="space-y-4">
              {suggestions.map(({ pool, reason }, index) => (
                <div
                  key={pool.id}
                  className="p-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-[#3A2F29] dark:to-[#2C2522] border border-gray-200 dark:border-gray-600 rounded-xl shadow-md transition hover:shadow-lg"
                >
                  <p className="font-bold text-gray-900 dark:text-white mb-1">
                    {index + 1}. {pool.name} <span className="text-sm text-gray-600 dark:text-gray-300">({pool.tokens.join(' / ')})</span>
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    🔎 Reason: <span className="font-medium">{reason}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You may need to swap into: <span className="font-semibold">{pool.requiredTokens.join(', ')}</span>
                  </p>

                  <div className="mt-3 text-right">
                    <button
                      onClick={() => swapToken()}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
                    >
                      🔁 Swap Token
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoadingSuggestions && !selectedStrategy && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
              <p className="text-gray-600 dark:text-gray-300">Please select a strategy to receive suggestions.</p>
            </div>
          )}
        </div>
      </div>

    );
}
  