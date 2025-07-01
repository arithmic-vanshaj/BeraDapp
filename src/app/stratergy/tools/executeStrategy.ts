import { Address } from "viem";
import { depositIntoBERAVault } from "./depositIntoBERAVault";
import { calculateSlippage } from "./calculateSlippage";

const swapURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/swap`;

export async function executeStrategyApi(
    inputAmount: number,
    reqTokenAddress: `0x${string}`,
    currentToken: `0x${string}`,
    address: Address,
    tokenBalance: number,
    vaultAddress: Address,
    slippagePercent: number,
    nativeToken: Address,
) {
    // step 1: check balance
    const Bera_balance = tokenBalance;
    // Step 2: Token check
    const swapNeeded = needsSwap(currentToken, reqTokenAddress);

    if (typeof swapNeeded !== "boolean") {
        return { status: "error", errorText: "Invalid swap check result." };
    }

    // Step 3: calculate slippage
    let slippage: number;
    try {
        slippage = await calculateSlippage(inputAmount, slippagePercent, tokenBalance);
    } catch (err: any) {
        return { status: 400 , errorText: `Slippage calculation failed: ${err?.message || err}` };
    }

    // Step 4: execute swap based on Token Check
    let swapResult = null;
    if (swapNeeded) {
        swapResult = await fetch(swapURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tokenIn: currentToken,
                tokenOut: reqTokenAddress,
                amount: inputAmount,
                to: address,
                slippage: slippage,
                from: address,
                nativeToken
            }),
        }).then(res => res.json());
        if (!swapResult?.status || swapResult.status !== 200) {
            return { status: 400 , errorText: swapResult?.error || "Swap failed" };
        }
    }

    // Step 5: Once swap is done or no swap
    // execute Pool-Vault Deposit
    const depositRes = await depositIntoBERAVault(address, vaultAddress, reqTokenAddress, inputAmount);
    if (!depositRes?.status || depositRes.status !== 200) {
        return { status: 400 , errorText: depositRes?.errorText || "Deposit failed" };
    }

    return { status: 200, text: "success executed strategy", data: depositRes};

}

function needsSwap(currentToken: `0x${string}`, reqToken: `0x${string}`): boolean {
  return currentToken.toLowerCase() !== reqToken.toLowerCase();
}
