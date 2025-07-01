// import { web3Agent } from "../api/llmApi";
import { fetchTokenHistoryDataFromCoinGecko } from "../api/tokenhistoryPriceApi";
import { executeSwapApi } from "../api/swapApi";
import { OogaBoogaPriceApi } from "../api/OogaBoogaPriceApi";
import { Request, type Response } from 'express';
// import { cookies } from "next/headers";

async function handlerGetTokenHistoryData(req: Request, res: Response) {
    try {
        const { id, contract_address } = req.body;

        if (!id || !contract_address) {
            return Response.json({ status: 400, 
                error: "Missing id or token contract address" });
        }
        const data = await fetchTokenHistoryDataFromCoinGecko(id, contract_address);

        return Response.json({ status: 200, data });
    } catch (error) {
        console.error("Error in handlerGetTokenHistoryData:", error);
        return Response.json({ status: 500, error: error instanceof Error ? error.message : String(error) });
    }
}

// async function handlerWeb3Agent(req: Request, res: Response) {
//     try {
//         const { userMessage, assistantId, threadId } = await req.json();
//         if (userMessage == null || assistantId == null || threadId == null) {
//             return { status: 400, error: "Missing userMessage, assistantId, or threadId" };
//         }
//         if (!userMessage) {
//             console.log("Error: No user message given ")
//             return { status: 400, error: " NO user messgae " }
//         }

//         // call the web3agent api
//         const web3Res = await web3Agent(userMessage, assistantId, threadId);
//         if (web3Res instanceof Error) {
//             return { status: 500, error: web3Res.message || "Internal Server Error" };
//         }

//         if (web3Res.res?.type != "string") {
//             return { status: 500, error: "Internal Server Error" };
//         }

//         console.log(web3Res);

//         return {
//             status: 200,
//             reply: web3Res.res,
//             assistantId: web3Res.assistantId,
//             threadId: web3Res.threadId
//         }
//     } catch (error) {
//         console.error("Error in handlerWeb3Agent:", error);
//         return { status: 500, error: error instanceof Error ? error.message : String(error) };
//     }
// }

async function handlerSwap(req: Request, res: Response) {
    const {
        tokenIn,
        tokenOut,
        amount,
        to,
        slippage,
        from,
        nativeToken,
    } = await req.body;
    try {
        if (!tokenIn || !tokenOut){
          return Response.json({
            status: 400, error: "Missing either tokenIn or output token"
          });
        }
        // if there is no amount set or is 0, return error 
        if (!amount || amount == 0 ){
          return Response.json({
            stauts: 400, error: "Amount is not set or attempting 0 swap"
          });
        }
        // if either of to or from is not set, return error
        if (!to || !from){
          return Response.json({
            status: 400, error: "Sender or receiver address is not set"
          })
        }
        if (nativeToken === undefined) {
            return Response.json({
                status: 400, error: "nativeToken parameter is missing"
            });
        }

        const swapParams = {
            tokenIn,
            tokenOut,
            amount,
            to,
            slippage,
            from,
            nativeToken,
        };
        // call the execute Swap Api with input parameters
        const res = await executeSwapApi(swapParams);
        if (res.status !== 200) {
            console.error("Swap failed with status: ", res.status, res.error);
            return { status: 400, error: res.message || "Swap Failed" };
        }
        // if swap is successfully executed, return the hash and the receipt
        return {
            status: 200,
            swapTx: res.swapTx,
            approveAllowanceTx: res.approveAllowanceTx,
        };
    } catch (error) {
        console.error("Error in swap handler:", error);
        return { status: 500, message: "Internal Server Error. Swap Failed", error: error };
    }
}

// async function handlerExecuteStrategy(
//     inputAmount: number,
//     reqTokenAddress: `0x${string}`,
//     currentTokenAddress: `0x${string}`,
//     address: Address,
//     tokenBalance: number,
//     vaultAddress: Address,
//     slippagePercent: number,
// ) {
//     try {
//         const res = await executeStrategyApi(
//             inputAmount,
//             reqTokenAddress,
//             currentTokenAddress,
//             address,
//             tokenBalance,
//             vaultAddress,
//             slippagePercent
//         );

//         if (res.status !== 200) {
//             console.error("Strategy executed with error: ", res.errorText);
//             return { status: 400, error: res.errorText || "Strategy executed with error" };
//         }
//     } catch (error) {
//         console.error("Error in executing Strategy:", error);
//         return {
//             status: 500,
//             message: "Internal Server Error. Executing Strategy Failed",
//             error: error,
//         };
//     }
// }

async function hanlderWallet(req: Request, res: Response) {
    try {
        const { walletAddress, session } = req.body;

        if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
            return res.status(400).send('Invalid walletAddress');
        }

        // Store walletAddress and session in localStorage (if running in a browser context)
        // In Node.js/Express, localStorage is not available. This is just a placeholder.
        // If you want to store on the client, send a response and let the client handle localStorage.
        // Example response:
        return res.status(200).json({ message: 'Stored in local database', walletAddress, session });

    } catch (err) {
        console.error("Error in walletRoute, storing wallet address in session state: ", err);
        return new Response(`Error: ${err instanceof Error ? err.message : String(err)}`, { status: 500 });
    }
}

async function handlerGetTokenPrice(req: Request, res: Response) {
    try {
        const { currency, chain } = await req.body();
        if (!currency || !chain) {
            return new Response(JSON.stringify({ status: 400, error: "Missing currency or chain" }), { status: 400 });
        }
        const priceApiRes = await OogaBoogaPriceApi(chain, currency);

        if (priceApiRes.status && priceApiRes.error) {
            return new Response(JSON.stringify({ status: priceApiRes.status, error: priceApiRes.error }), 
            { status: priceApiRes.status });
        } else {
            return new Response(JSON.stringify(priceApiRes), { status: 200 });
        }
    } catch (error) {
        console.error(" Error in Get Token Price handling. Error: ", error);
        return new Response(`Error: ${error instanceof Error ? error.message : String(error)}`, { status: 500 });
    }
}


// export APIs
export {
    handlerGetTokenHistoryData,
    // handlerWeb3Agent,
    handlerSwap,
    hanlderWallet,
    handlerGetTokenPrice,
    // handlerExecuteStrategy,
}