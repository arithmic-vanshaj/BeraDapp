import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { handleRunTools } from "./handleRunTools";

// perform the run and handle functions
export async function performRun(client: OpenAI, run: Run, threadId: string){
    while (run.status == "requires_action"){
        run = await handleRunTools(client, run, threadId);
    }

    if (run.status == "failed"){
        const errorMsg = `I encountered an error on run ${run.last_error?.message || `unknown error`}`;
        console.log('Run failed with error: ', errorMsg);
        await client.beta.threads.messages.create(threadId, {
            role: "assistant", content: errorMsg
        });
        return {
            type: 'text',
            text: {
                value: errorMsg,
                annotations: [],
            }
        }
    }

    const messages = await client.beta.threads.messages.list(threadId);
    const latestMessage = messages.data.find(message => message.role == "assistant");

    // // extract image vs text

    // let result;
    // const content = latestMessage?.content[0];
    // if (content?.type === 'text') { `q1w2e34p0-[=\`
    //     result = content;
    // } else if (content?.type === 'image_file' || content?.type === "image_url") {
    //     result = content;
    // } else {
    //     result = {
    //         type: 'text',
    //         text: {
    //             value: "No response from assistant",
    //             annotations: [],
    //         }
    //     };
    // }

    // return result
}