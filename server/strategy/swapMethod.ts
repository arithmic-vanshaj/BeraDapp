import { Address } from "viem";

interface SwapParams{
    tokenIn: Address,
    tokenOut: Address,
    amount: bigint,
    to: Address,
    slippage: number,
    from: Address,
}

const headers = {
	Authorization: `Bearer ${process.env.OOGABOOGA_API_KEY}`,
};
const publicApiUrl = new URL(`${process.env.OOGABOOGA_PUBLIC_API_URL}/v1/swap`);

export async function swap(swapParams: SwapParams){
    
	publicApiUrl.searchParams.set("tokenIn", swapParams.tokenIn);
	publicApiUrl.searchParams.set("amount", swapParams.amount.toString());
	publicApiUrl.searchParams.set("tokenOut", swapParams.tokenOut);
	publicApiUrl.searchParams.set("to", swapParams.to);
	publicApiUrl.searchParams.set("slippage", swapParams.slippage.toString());

	try {
		const res = await fetch(publicApiUrl, { headers });
		if (!res.ok) {
			throw new Error(`Swap API error: ${res.status} ${res.statusText}`);
		}
		const { tx } = await res.json();

		// send this tx to the frontend for signing
		if (!tx || !tx.from || !tx.to || !tx.data){
			return {status: 400, error: " Invalid transaction data from swap API "};
		}

		return tx;
	} catch (error) {
		console.error("Swap failed: ", error);
		return { status: 500, error: error instanceof Error ? error.message: String(error)};
	}

	// 	console.log("Submitting swap...");
	// 	let hash: `0x${string}`;
	// 	try {
	// 		hash = await client.sendTransaction({
	// 			from: tx.from as Address,
	// 			to: tx.to as Address,
	// 			data: tx.data as `0x${string}`,
	// 			value: tx.value ? BigInt(tx.value) : BigInt(0),
	// 			chain: client.chain,
	// 		});
	// 		console.log("hash", hash);
	// 	} catch (err) {
	// 		console.error("Error sending transaction:", err);
	// 		throw err;
	// 	}

	// 	let rcpt;
	// 	try {
	// 		rcpt = await publicClient.waitForTransactionReceipt({ hash });
	// 		console.log("Swap complete", rcpt.status);
	// 	} catch (err) {
	// 		console.error("Error waiting for transaction receipt:", err);
	// 		throw err;
	// 	}

	// 	return { hash, rcpt };
	// } catch (err) {
	// 	console.error("Swap failed:", err);
	// 	throw err;
	// }
}