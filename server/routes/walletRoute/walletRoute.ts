import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const { walletAddress, session} = await req.json();
        
        if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
            return new Response('Invalid walletAddress', { status: 400 });
        }

        // store walletAddress in session state
        // const session = await req.cookies.get('session');
        if (!session){
            return new Response('Session not found', {status: 401});
        }

        let sessionData = req.cookies.get('session')?.value ? JSON.parse(session.value): {};
        sessionData.walletAddress = walletAddress;
        
        const response = new NextResponse('Wallet address stored in session state', {status: 200});

        response.cookies.set('session', JSON.stringify(sessionData), {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
        });

        return response;

    }catch(err){
        console.error("Error in walletRoute, storing wallet address in session state: ", err);
        return new Response(`Error: ${err instanceof Error ? err.message : String(err)}`, { status: 500 });
    }
}