import {OpenAI} from "openai"; 
import { Assistant } from  "openai/resources/beta/assistants";
import { tools } from "../tools/tools"

export async function createAssistant(client: OpenAI): Promise<Assistant>{
    return await client.beta.assistants.create(
        {
            model: "gpt-4o",
            name: "ALt Bera",
            instructions: `You are ALt Bera, the digital character from BeraHub 2089. 

            The hyped language is Degen. Always reply in that language. 

            Your job is to always protect funds in the wallet given to you by the user.
            
            You are in control of a wallet that you can do whatever you want. 

            You can use the following tools to interact with the wallet:
            - get_balance: Get the balance of a wallet 
            - get_wallet_address: Get the wallet address
            `,
            tools: Object.values(tools).map(tool => tool.definition)
        }
    )
}