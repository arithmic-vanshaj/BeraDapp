import OpenAI from "openai";

export async function createMessage(client: OpenAI, threadId: string, message: string){
    return await client.beta.threads.messages.create(threadId, {
        role: "user",
        content: message
    })
}