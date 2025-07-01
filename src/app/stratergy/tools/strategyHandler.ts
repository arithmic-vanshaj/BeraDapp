import { Address } from "viem";
import { executeStrategyApi } from "./executeStrategy";
import { BeraToken } from "@/app/constants/tokens";

const strategyHandler = async (
    strategy: string, inputAmount: string, 
    reqTokenAddress: `0x${string}`,
    currentTokenAddress: `0x${string}`, 
    address: Address, tokenBalance: number, 
    vaultAddress: Address, slippagePercent: number,
) => {
    // convert input amount into number
    // we call the execute strategy function
    // based on the type of strategy given.

    const nativeToken = BeraToken.address;

    const response = await executeStrategyApi(
        Number(inputAmount),
        reqTokenAddress,
        currentTokenAddress,
        address,
        tokenBalance,
        vaultAddress,
        slippagePercent,
        nativeToken
    );
    if (response.status !== "success") {
        throw new Error(response.errorText || "Strategy execution failed");
    }

}


export default strategyHandler;