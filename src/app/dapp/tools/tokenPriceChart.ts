"use client";
import { useEffect, useState } from "react";
import dotenv from 'dotenv';
dotenv.config();

export interface TokenPriceProps {
  id: string;
  contract_address: string;
}

export interface TokenChartData {
  labels: Date[];
  priceData: number[];
  marketCap: number[];
  volume: number[];
}

export function useTokenPriceData({ id, contract_address }: TokenPriceProps) {
  const [chartData, setChartData] = useState<TokenChartData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const chartURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/chart`

  useEffect(() => {
    const fetchTokenHistoryData = async () => {
      try {
        const chartRes = await fetch(chartURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, contract_address }),
        });
        if (!chartRes.ok) {
            throw new Error("Failed to fetch from CoinGecko");
        }
        
        console.log("res: ", chartRes);

        const data = await chartRes.json();
        console.log(data);

        const formattedData: TokenChartData = {
          labels: data.prices.map((point: [number, number]) => new Date(point[0])),
          priceData: data.prices.map((point: [number, number]) => point[1]),
          marketCap: data.market_caps.map((point: [number, number]) => point[1]),
          volume: data.total_volumes.map((point: [number, number]) => point[1]),
        };

        setChartData(formattedData);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTokenHistoryData();
  }, [id, contract_address]);

  return { chartData, error };
}
