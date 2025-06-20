import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

// Fetch data from external API
async function fetchPriceApiData(currency: string) {
    const { chain } = useAccount();
    const API_URL = `https://${chain}.api.oogabooga.io/v1/prices?currency=`; // using bera oogabooga price api
    const response = await fetch(API_URL + `${currency}`,
        {
            method: 'GET',
            headers: { 
                "Authorization" : "Bearer" + `${process.env.OogaBoogaSecret}`, 
                "Accept": "*/*" 
            },
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
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