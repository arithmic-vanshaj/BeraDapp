
import { cookies } from 'next/headers';
import { toolConfig } from './tools';

const getWalletAddressTool: toolConfig = {
    definition: {
        type: 'function',
        function: {
            name: 'get_wallet_address',
            description: "get the wallet address associated with a user",
            parameters: {
                type: 'object',
                properties: {},
                required:[] 
            },
        }
    },
    handler: async () => {
        // reterive the wallet address from session state
        const sessionCookie = (await cookies()).get('session');
        if (!sessionCookie) {
            throw new Error('session not found');
        }
        const sessionData = JSON.parse(sessionCookie.value);
        if (!sessionData){
            throw new Error('session data not found');
        }

        const walletAddress = sessionData.walletAddress;
        if (!walletAddress) {
            throw new Error(' Wallet Address not found in session data');
        }

        return walletAddress;
    }
}

export {
    getWalletAddressTool
}