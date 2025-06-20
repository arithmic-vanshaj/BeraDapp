import { NextRequest } from "next/server";
import { handlerExecuteStrategy } from "../../handler/handler";

export async function POST(req: NextRequest){
    try {
        const { strategy, inputAmount, apr, token, address } = await req.json();
        if (!strategy || !inputAmount || !apr || !token || !address) {
            return new Response(JSON.stringify({ status: 400, error: "Missing required parameters" }), { status: 400 });
        }

        // Call the handler to execute the strategy
        const response = await handlerExecuteStrategy(strategy, inputAmount, apr, token, address);
        
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error executing strategy:", error);
        return new Response(JSON.stringify({ status: 500, error: "Internal Server Error" }), { status: 500 });
    }
}