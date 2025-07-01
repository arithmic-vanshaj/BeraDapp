// import { NextRequest } from "next/server";
// import { handlerExecuteStrategy } from "../../handler/handler";

// export async function POST(req: NextRequest){
//     try {
//         const { 
//             inputAmount, 
//             reqTokenAddress, 
//             currentTokenAddress, 
//             address, 
//             tokenBalance, 
//             vaultAddress, 
//             slippagePercent 
//         } = await req.json();

//         if (
//             typeof inputAmount !== "number" ||
//             typeof reqTokenAddress !== "string" ||
//             typeof currentTokenAddress !== "string" ||
//             typeof address !== "string" ||
//             typeof tokenBalance !== "number" ||
//             typeof vaultAddress !== "string" ||
//             typeof slippagePercent !== "number"
//         ) {
//             return new Response(JSON.stringify({ status: 400, error: "Missing or invalid required parameters" }), { status: 400 });
//         }

//         // Call the handler to execute the strategy
//         const response = await handlerExecuteStrategy(
//             inputAmount,
//             `0x${reqTokenAddress}`,
//             `0x${currentTokenAddress}`,
//             `0x${address}`,
//             tokenBalance,
//             `0x${vaultAddress}`,
//             slippagePercent
//         );
//         return new Response(JSON.stringify(response), { status: 200 });
//     } catch (error) {
//         console.error("Error executing strategy:", error);
//         return new Response(JSON.stringify({ status: 500, error: "Internal Server Error" }), { status: 500 });
//     }
// } 