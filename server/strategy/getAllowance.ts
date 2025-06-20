import { BeraToken } from "@/app/dapp/components/tokens";
import { Address, maxUint256 } from "viem";

const PUBLIC_API_URL = process.env.OOGABOOGA_PUBLIC_API_URL;
const OOGABOOGA_API_KEY = process.env.OOGABOOGA_API_KEY;

if (!PUBLIC_API_URL) throw new Error("OOGABOOGA_PUBLIC_API_URL is required");
if (!OOGABOOGA_API_KEY) throw new Error("OOGABOOGA_API_KEY is required");

const headers = {
	Authorization: `Bearer ${OOGABOOGA_API_KEY}`,
};

export const getAllowance = async (token: Address, from: Address) => {
  // Native token does not require approvals for allowance
	if (token === BeraToken.name) return maxUint256;

	const publicApiUrl = new URL(`${PUBLIC_API_URL}/v1/approve/allowance`);
	publicApiUrl.searchParams.set("token", token);
	publicApiUrl.searchParams.set("from", from);

	const res = await fetch(publicApiUrl, {
		headers,
	});
	const json = await res.json();
	return json.allowance;
};
