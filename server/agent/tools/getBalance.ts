import { Address } from "viem";
import { toolConfig } from "./tools";
import { publicClient } from "@/app/dapp/viem/viemPublicClient";

interface GetBalanceArgs{
    wallet: Address;
}

const getBalanceTool: toolConfig<GetBalanceArgs> = {
    definition:{
        type: 'function',
        function: {
            name: 'get_balance',
            description: "get the balance of wallet",
            parameters: {
                type: 'object',
                properties: {
                    wallet: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: "The wallet address to get the balance of",
                    }
                },
                required: ['wallet'],
            },
        }
    },
    handler: async ({wallet}) => {
        const balance = await publicClient.getBalance({address: wallet});
        return balance
    }
}

export {
    getBalanceTool
}