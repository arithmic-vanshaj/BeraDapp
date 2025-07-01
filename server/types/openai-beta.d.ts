// types/openai-beta.d.ts
declare module "openai/resources/beta/threads/runs/runs" {
  export interface Run {
    id: string;
    status: string;
    last_error?: {
      message?: string;
    };
    // add other fields as needed
  }
}
