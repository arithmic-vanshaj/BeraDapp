import OpenAI from "openai";

type Run = Awaited<ReturnType<OpenAI['beta']['threads']['runs']['create']>>;

// creating the run 
export async function createRun(client: OpenAI, threadId: string, assistantID: string): Promise<Run>{
    let run = await client.beta.threads.runs.create(threadId, {
        assistant_id: assistantID
    });

    // use streaming or do polling to check the status of the run
    while (run.status == "in_progress" || run.status == "queued"){
        await new Promise(resolve => setTimeout(resolve, 2000)) // wait for 2 sec
        run = await client.beta.threads.runs.retrieve(threadId, run.id)
    }

    return run;
}