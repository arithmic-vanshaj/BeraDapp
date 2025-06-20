import { BERA_TOKEN_ADDRESS, HONEY_TOKEN_ADDRESS } from "@/app/dapp/components/constant";
import { Address, parseEther } from "viem";
import { getAllowance } from "../strategy/getAllowance";
import { approveAllowance } from "../strategy/approveAllowance";
import { swap } from "../strategy/swapMethod";

interface swapParams {
    tokenIn: Address,
    tokenOut: Address,
    amount: bigint,
    to: Address,
    slippage: number,
    from: Address,
}

export async function executeSwapApi(swapParams: swapParams){
    try {
        const allowance = await getAllowance(swapParams.tokenIn, swapParams.from);
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