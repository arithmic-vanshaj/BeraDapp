import { Address, parseEther } from "viem";
import { getTokenAllowance } from "../strategy/getAllowance";
import { approveAllowance } from "../strategy/approveAllowance";
import { swap } from "../strategy/swapMethod";

interface swapParams {
    tokenIn: `0x${string}`,
    tokenOut: `0x${string}`,
    amount: number,
    to: Address,
    slippage: number,
    from: Address,
    nativeToken: Address,
}

export async function executeSwapApi(swapParams: swapParams){
    try {
        const { status: allowanceStatus, allowance, error: allowanceError }  = await getTokenAllowance(swapParams.tokenIn, swapParams.nativeToken, swapParams.from);
        if (allowanceStatus !== 200 || !allowance) {
            console.error("Error in getAllowance:", allowanceError);
            return { status: allowanceStatus || 500, message: "Failed to get allowance", error: allowanceError };
        }
        console.log("allowance: ", allowance);

        let approveAllowanceTx;
        // Approve if necessary
        if (allowance < swapParams.amount) {
            try {
                approveAllowanceTx = await approveAllowance(
                    swapParams.tokenIn,
                    swapParams.from,
                    swapParams.amount - allowance,
                );
            } catch (approveError) {
                console.error("Error in approveAllowance:", approveError);
                return { status: 500 , message: "Internal Server Error ", error: approveError };
            }
        }

        // Swap
        try {
            const { swapTx } = await swap(swapParams);
            return { status: 200, swapTx: swapTx, approveAllowanceTx: approveAllowanceTx };
        } catch (swapError) {
            console.error("Error in swap:", swapError);
            return { status: 500, message: "Internal Server Error. Swap Failed", error: swapError };
        }
    } catch (error) {
        console.error("Error in executeSwapApi:", error);
        return { status: 400, message: "Unexpected error", error };
    }
}