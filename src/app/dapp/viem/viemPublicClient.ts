import { createPublicClient, http } from "viem";
import { berachainmainnet } from "../tools/customChains";

export const publicClient = createPublicClient({ // public actions
  chain: berachainmainnet,
  transport: http()
})