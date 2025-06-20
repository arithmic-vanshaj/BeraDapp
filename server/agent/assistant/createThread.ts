import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads.mjs";

export async function createThread(client: OpenAI, message: string): Promise<Thread>{
    // creating a thread
    const thread = await client.beta.threads.create();

    await client.beta.threads.messages.create(thread.id,{
            role: "user",
            content: message
        }
    )   
    return thread
}