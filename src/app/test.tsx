import React, { useState, useEffect } from 'react';
import { createWalletClient, http, publicActions, walletActions } from 'viem';
import { foundry } from 'viem/chains';
import { parseEther } from 'viem';
import { WBERA_TOKEN_ADDRESS, bera_to_wbera_abi } from "../app/constants/constant"

export default function WrapBeraToWbera() {
  const [receipt, setReceipt] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const deposit = async () => {
      try {
        console.log("Started wrapping BERA to WBERA...");
        
        const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Use the correct address
        console.log("Using account:", account);

        // Create wallet client
        const walletClient = createWalletClient({
          account,
          chain: foundry, // Connect to local Foundry network
          transport: http(), // HTTP transport (local node)
        }).extend(publicActions)
          .extend(walletActions);

        console.log("Client created. Simulating contract interaction...");
        
        // Simulate the contract interaction (simulate the deposit)
        const { request } = await walletClient.simulateContract({
          address: WBERA_TOKEN_ADDRESS,
          abi: bera_to_wbera_abi, // BERA -> WBERA ABI
          functionName: 'deposit', // Function to call
          value: parseEther('0.01'), // Amount to deposit in BERA (converted to wei)
          account,
        //   rpcUrl: "https://rpc.berachain.com/"
        });

        console.log("Simulation successful. Sending transaction...");
        
        // Send the transaction
        const hash = await walletClient.writeContract(request);
        console.log("Transaction sent. Hash:", hash);

        // Wait for transaction receipt
        const txReceipt = await walletClient.waitForTransactionReceipt({ hash });
        setReceipt(txReceipt);
        console.log("Transaction receipt:", txReceipt);
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message);
      }
    };

    deposit();
  }, []);

  return (
    <div>
      <h1>Wrap BERA → WBERA</h1>
      {receipt ? (
        <pre>{JSON.stringify(receipt, null, 2)}</pre>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Wrapping 0.01 BERA to WBERA...</p>
      )}
    </div>
  );
}
