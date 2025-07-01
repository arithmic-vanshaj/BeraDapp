import { Address } from "viem";
import dotenv from 'dotenv';
dotenv.config();

const PUBLIC_API_URL = process.env.OOGABOOGA_PUBLIC_API_URL;
const OOGABOOGA_API_KEY = process.env.OOGABOOGA_API_KEY;
const maxUint256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

if (!PUBLIC_API_URL) throw new Error("OOGABOOGA_PUBLIC_API_URL is required");
if (!OOGABOOGA_API_KEY) throw new Error("OOGABOOGA_API_KEY is required");

const headers = {
	Authorization: `Bearer ${OOGABOOGA_API_KEY}`,
};

const getTokenAllowance = async (token: string, nativeToken:string, from: string) => {
  if (token === nativeToken) {
    return {
      status: 200,
      allowance: maxUint256,
      error: "",
    };
  }

  try {
    const publicApiUrl = new URL(`${PUBLIC_API_URL}v1/approve/allowance`);
    publicApiUrl.searchParams.set("token", token);
    publicApiUrl.searchParams.set("from", from);

    const res = await fetch(publicApiUrl, { headers });

    if (!res.ok) {
      console.error("Error in Allowance - OogaBooga API:", res.statusText);
      return {
        status: res.status,
        allowance: "",
        error: res.statusText,
      };
    }

    const allowanceRes = await res.json();
    return {
      status: 200,
      allowance: allowanceRes.allowance,
      error: "",
    };
    
  } catch (error) {
    console.error("Error fetching allowance:", error);
    return {
      status: 500,
      allowance: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};


export {
	getTokenAllowance
}