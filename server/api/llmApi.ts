import OpenAI from 'openai';
import { createAssistant } from '../agent/assistant/createAssistant';
import { createThread } from '../agent/assistant/createThread';
import { createMessage } from '../agent/assistant/createMessage';
import { createRun } from '../agent/assistant/createRun';
import { performRun } from '../agent/assistant/performRun';

const llmClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const startMessage = "";

// Agent is initialized if first time, 
// else wait for user message to perform further

export async function web3Agent(userMessage: string, assistantId?: string, threadId?: string){
    if (!userMessage) {
        return new Error(" No message received ");
    }

    try {
        // 1. Create an assistant or use the old one
        if (!assistantId){
            // new assitant for the first time
            const assistant = await createAssistant(llmClient);
            assistantId = assistant.id;
        }

        // 2. Create or resue the thread
        if (!threadId){
            // create a new thread
            const thread = await createThread(llmClient, startMessage);
            threadId = thread.id;
        }

        // 3. Post a new Message 
        await createMessage(llmClient, threadId, userMessage)

        // 4. Create a Run
        const run = await createRun(llmClient, threadId, assistantId)

        // 5. perform the run
        const res = await performRun(llmClient, run, threadId)

        return {res: res, assistantId: assistantId, threadId: threadId}
    }
    catch (err) {
        console.log("web3 agent error: ", err);
        return new Error(`Error: ${err instanceof Error ? err.message : JSON.stringify(err)}`)
    } 
}