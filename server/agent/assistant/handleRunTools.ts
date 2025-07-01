import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { tools } from "../tools/tools";

export async function handleRunTools(client: OpenAI, run: Run, threadId: string): Promise<Run>{
    const toolCalls = run.required_action?.submit_tool_outputs?.tool_calls;
    if (!toolCalls){
        return run;
    }
    // output of the tools call
    const toolCallOutputs = await Promise.all(
        toolCalls.map(async (tool) => {
            const toolConfig = tools[tool.function.name]
            if (!toolConfig){
                console.log(`Tool ${tool.function.name} not found`);
                return null;
            }
            // if we have the tools
            try {
                const args = JSON.parse(tool.function.arguments);
                const output = await toolConfig.handler(args);
                return {
                    tool_call_id: tool.id,
                    output: String(output)
                }
            } 
            catch(error) {
                const errorMsg = error instanceof Error ? error.message : String(error)
                return {
                     tool_call_id: tool.id,
                     output: String(errorMsg)
                }
            }

        })
    ) 

    // checking for valid outputs
    const validToolOutput = toolCallOutputs.filter(Boolean) as 
    OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput[];

    if (validToolOutput.length === 0){
        return run
    }

    return client.beta.threads.runs.submitToolOutputsAndPoll(
        threadId, run.id, {tool_outputs: validToolOutput}
    );
}