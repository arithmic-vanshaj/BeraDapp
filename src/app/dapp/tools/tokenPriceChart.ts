"use client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchTokenHistoryData = async () => {
      try {
        const url = `/api/tokenHistoryApi?id=${id}&contract_address=${contract_address}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch from CoinGecko");
        }

        const data = await res.json();
        // console.log(data);
        // if (!Array.isArray(data.priceData)){ throw new Error(" Invalid data format")}

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
