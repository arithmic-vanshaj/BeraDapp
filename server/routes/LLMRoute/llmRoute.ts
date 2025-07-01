// // server/routes/tokenChartRoute.ts

// import { NextRequest, NextResponse } from "next/server";
// import { HandlerWeb3Agent } from "../../handler/handler";

// export async function POST(req: NextRequest){
//     try{
//         const {userMessage, assistantId, threadId} = await req.json();
//         const result = await HandlerWeb3Agent(userMessage, assistantId, threadId);

//        if (result instanceof Error){
//         return NextResponse.json({
//                 error: result.message,
//                 status: 500
//             }
//         );
//        }

//        return NextResponse.json({
//             reply: result.reply, 
//             assistantId: result.assistantId, 
//             threadId: result.threadId
//        });
//     } catch (err) {
//         console.log("Error in Agent POST: ", err);
//         return NextResponse.json({
//             error: " Internal Server Error", status: 500}
//         )
//     }
// }
