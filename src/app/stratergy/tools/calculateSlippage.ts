/**
 * Calculates slippage based on input amount and slippage percentage.
 * @param amount The original amount (number).
 * @param slippagePercent The slippage percentage (e.g., 0.5 for 0.5%).
 * @returns The minimum amount after slippage.
 */
export function calculateSlippage(inputAmount: number, slippagePercent: number, tokenBalance: number): number {
    const slippageAmount = inputAmount * (slippagePercent / 100);
    return inputAmount - slippageAmount;
}