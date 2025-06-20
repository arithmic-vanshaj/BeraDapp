import { Address } from "viem";
import { web3Agent } from "../api/llmApi";
import { fetchTokenHistoryDataFromCoinGecko } from "../api/tokenhistoryPriceApi";
import { executeSwapApi } from "../api/swapApi";
import { executeStrategyApi } from "../strategy/executeStrategy";

async function handlerGetTokenHistoryData(id: string, erc20Address: string) {
    if (!id || !erc20Address) {
        throw new Error(" Missing id or token contract address ");
    }
    const data = await fetchTokenHistoryDataFromCoinGecko(id, erc20Address);
    return data;
}

async function HandlerWeb3Agent(userMessage: string, assistantId?: string, threadId?: string) {
    if (!userMessage) {
        console.log("Error: No user message given ")
        return { status: 400, error: " NO user messgae "}
    }

    // call the web3agent api
    const res = await web3Agent(userMessage, assistantId, threadId);
    if (res instanceof Error) {
        return { status: 500, error: res.message || "Internal Server Error" };
    }

    if (res.res?.type != "string"){
        return { status: 500, error: "Internal Server Error" };
    }

    console.log(res);

    return {
        reply: res.res,
        assistantId: res.assistantId,
        threadId: res.threadId
    }
}

async function HandlerSwap(tokenIn: Address, tokenOut: Address, 
    amount: bigint, to: Address, slippage: number, from: Address){
    try {
        const swapParams = {
            tokenIn, tokenOut, amount, to , slippage, from
        };
        // call the execute Swap Api with input parameters
        const res = await executeSwapApi(swapParams);
        if (res.status !== 200) {
            console.error("Swap failed with status: ", res.status, res.error);
            return {status: 400, error: res.message || "Swap Failed"} ;
        }
        // if swao is successfully executed, return the hash and the receipt
        return {
            status: 200, 
            swapTx: res.swapTx, 
            approveAllowanceTx: res.approveAllowanceTx
        };

    }catch (error) {
        console.error("Error in swap handler:", error);
        return { status: 500, message: "Internal Server Error. Swap Failed", error: error };
    }
}

async function handlerExecuteStrategy(strategy: string, 
    inputAmount: number, apr: number, token: string, address: Address){
    try{
        const res = await executeStrategyApi(strategy, inputAmount, apr, token, address);

        if (res.status !==200){
            console.error("Strategy executed with error: ", res.error);
            return {status: 400, error: res.error || "Strategy executed with error"};
        }

    }   catch (error) {
        console.error("Error in executing Strategy:", error);
        return { status: 500, message: "Internal Server Error. Executing Strategy Failed", error: error };
    }
}


// export APIs
export {
    handlerGetTokenHistoryData,
    HandlerWeb3Agent,
    HandlerSwap,
    handlerExecuteStrategy,
}