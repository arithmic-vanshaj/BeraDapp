import { Address } from "viem";
import dotenv from 'dotenv';
dotenv.config();

const headers = {Authorization: `Bearer ${process.env.OOGABOOGA_API_KEY}`};
const url = process.env.OOGABOOGA_PUBLIC_API_URL;

export const approveAllowance = async (
	token: Address,
    address: Address,
	amount: number,
) => {
	const publicApiUrl = new URL(`${url}/v1/approve`);
	publicApiUrl.searchParams.set("token", token);
    publicApiUrl.searchParams.set("address", address);
	publicApiUrl.searchParams.set("amount", amount.toString());

	try	{	
		const res = await fetch(publicApiUrl, { headers });
		const { tx } = await res.json();

		if (!tx) {
			return {status: 400, error: "Invalid approve allowance raw tx data"}
		}
	} catch (err) { 
		return {status: 500, error: err instanceof Error? err.message: String(err)};
	}

	// console.log("Submitting approve...");
	// const hash = await client.sendTransaction({
    //     from: tx.from as Address,
    //     to: tx.to as Address,
    //     data: tx.data as `0x${string}`,
    //     chain: client.chain,
    // });

	// const rcpt = await publicClient.waitForTransactionReceipt({
	// 	hash,
	// });
	// console.log("Approval complete", rcpt.transactionHash, rcpt.status);
};
