import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const tokenPriceCheckURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tokenprice`;

// Fetch data from external API
async function fetchPriceApiData(currency: string) {
    const { chain } = useAccount();
    const apiRes = await fetch(tokenPriceCheckURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ chain, currency }),
    })
}

// React hook to poll API at intervals
export function usePriceApi(currency: string) {
    const POLL_INTERVAL = 5000; // Interval in milliseconds

    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        let intervalId: NodeJS.Timeout;

        const getData = async () => {
            try {
                const result = await fetchPriceApiData(currency);
                if (isMounted) setData(result);
            } catch (err: any) {
                if (isMounted) setError(err.message);
            }
        };

        getData();
        intervalId = setInterval(getData, POLL_INTERVAL);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);

    return { data, error };
}