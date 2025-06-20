import { getBalanceTool } from "./getBalance";
import { getWalletAddressTool } from "./getWalletAddress";

export interface toolConfig<T = any> { 
    definition: {
        type: 'function'
        function: {
            name: string;
            description: string;
            parameters: {
                type: 'object';
                properties: Record<string, unknown>;
                required: string[];
            };
        };
    };
    handler: (args: T) => Promise<any>
}

export const tools: Record<string, toolConfig> = {
    // add all the tools required 
    get_Balance: getBalanceTool,
    get_wallet_address: getWalletAddressTool,
    // get_token_info: getTokenInfoTool,

}   