'use client';
import { Token } from "@berachain-foundation/berancer-sdk"
import { BERA_TOKEN_ADDRESS, HONEY_TOKEN_ADDRESS, IBERA_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS, WBERA_TOKEN_ADDRESS } from "../constants/constant";

const chainId = 80094; // bera mainnet chain id

    // defining the tokens
    const BeraToken  = new Token(
        chainId,
        BERA_TOKEN_ADDRESS,
        18,
        "BERA",
    )
    const iBERAToken = new Token(
        chainId,
        IBERA_TOKEN_ADDRESS,
        18,
        "iBERA",
    )
    const WBERAToken = new Token(
        chainId,
        WBERA_TOKEN_ADDRESS,
        18,
        "WBERA"
    )
    const HoneyToken = new Token(
        chainId,
        HONEY_TOKEN_ADDRESS,
        18,
        "HONEY",
    )
    const USDCToken = new Token(
        chainId,
        USDC_TOKEN_ADDRESS,
        18, "USDC"
    )

    export {
        BeraToken, 
        iBERAToken, 
        HoneyToken, 
        USDCToken,
        WBERAToken
    }