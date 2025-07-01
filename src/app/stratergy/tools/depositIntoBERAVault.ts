import walletClient from "@/app/dapp/viem/viemWalletClient";

export async function depositIntoBERAVault(
  walletAddress: `0x${string}`,
  vaultAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
  amount: number,
) {
  const client = walletClient();
  // Approve first
  try {
    const approveResult = await client.writeContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [vaultAddress, amount],
      account: walletAddress,
    });

    // Deposit
    const txHash = await client.writeContract({
      address: vaultAddress,
      abi: VAULT_ABI,
      functionName: 'deposit',
      args: [amount],
      account: walletAddress,
    });

    console.log(`Deposited into vault: ${txHash}`);
    return { status: 200, data: txHash };
  } catch (error: any) {
    console.error("Deposit failed:", error);
    return { status: 400, errorText: error?.message || String(error) };
  }
}
