// import { NextRequest, NextResponse } from "next/server";
// import { HandlerSwap } from "../../handler/handler";

// export async function POST(req: NextRequest) {
//   try {
//     const { tokenIn, tokenOut, amount, to, slippage, from } = await req.json();
//     if (!tokenIn || !tokenOut){
//       return NextResponse.json({
//         status: 400, error: "Missing either tokenIn or output token"
//       });
//     }
//     // if there is no amount set or is 0, return error 
//     if (!amount || amount == 0 ){
//       return NextResponse.json({
//         stauts: 400, error: "Amount is not set or attempting 0 swap"
//       });
//     }
//     // if either of to or from is not set, return error
//     if (!to || !from){
//       return NextResponse.json({
//         status: 400, error: "Sender or receiver address is not set"
//       })
//     }
    
//     // cal the swap handler
//     const swapResponse = await HandlerSwap(tokenIn, tokenOut, amount, to, slippage, from);
//     if (swapResponse.status !== 200){
//       return NextResponse.json({
//         status: 400, error: swapResponse.error
//       })
//     };

//     // if swap is successful, return the hash and the receipt 
//     // with success status and message to display in the frontend
//     return NextResponse.json({
//       status: 200, 
//       message: "swap raw tx data successfully retrieved",
//       swapTx: swapResponse.swapTx,
//       approveAllowanceTx: swapResponse.approveAllowanceTx
//     })
//   }catch(err){
//     return NextResponse.json({
//       status: 400, error: err, message: "Internal Server Error. Swap Failed"
//     })
//   };
// }
