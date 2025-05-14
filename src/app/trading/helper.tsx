'use client'

import { Address } from "viem";
import { HONEY_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS, WBERA_TOKEN_ADDRESS, WBTC_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS } from "../constants/constant";

interface TokenInfo {
    address?: `0x${string}`;
    symbol: string;
    decimals: number;
    name: string;
}

export const TOKENS: Record<string, TokenInfo> = {
    BERA: { address: undefined, symbol: 'BERA', decimals: 18, name: 'BERA (Native)' },
    WBERA: { address: WBERA_TOKEN_ADDRESS as Address, symbol: 'WBERA', decimals: 18, name: 'Wrapped BERA' },
    HONEY: { address: HONEY_TOKEN_ADDRESS as Address, symbol: 'HONEY', decimals: 18, name: 'Honey Stablecoin' },
    USDC: { address: USDC_TOKEN_ADDRESS as Address, symbol: 'USDC.e', decimals: 6, name: 'USDC.e' },
    WBTC: { address: WBTC_TOKEN_ADDRESS as Address, symbol: 'WBTC', decimals: 8, name: 'Wrapped BTC' },
    WETH: { address: WETH_TOKEN_ADDRESS as Address, symbol: 'WETH', decimals: 18, name: 'Wrapped Ether' },
};

export const COMMON_ERC20_SYMBOLS = ['HONEY', 'USDC.e', 'WBERA', 'WBTC', 'WETH'];

// Helper function (no change)
export const getTokenInfo = (symbol: string): TokenInfo | undefined => {
    return TOKENS[symbol.toUpperCase()];
}