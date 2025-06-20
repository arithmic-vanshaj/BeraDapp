import { toolConfig } from './tools'

interface GetTokenInfoArgs {
    tokenAddress: string;
}

export const getTokenInfoConfig: toolConfig<GetTokenInfoArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'getTokenInfo',
            description: 'Retrieves information about a cryptocurrency token given its name.',
            parameters: {
                type: 'object',
                properties: {
                    tokenAddress: {
                        type: 'string',
                        description: 'The name of the token to retrieve information for.'
                    }
                },
                required: ['tokenAddress']
            }
        }
    },
    handler: async ({ tokenAddress }) => {
       const url = `https://pro-api.coingecko.com/api/v3/onchain/networks/network/tokens/${tokenAddress}/info`;
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
            }
};