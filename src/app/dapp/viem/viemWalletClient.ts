import { createWalletClient, custom } from "viem";
import { useAccount } from "wagmi";


export default function walletClient(){
    const {address, chain} = useAccount()

    const walletClient = createWalletClient({
        account: address as `0x${string}`,
        chain: chain,
        transport: custom(window.ethereum)
    });

    return walletClient
}