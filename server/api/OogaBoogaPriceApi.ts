import { Chain } from "viem";

export async function OogaBoogaPriceApi(chain:Chain | undefined, currency: string) {
    const API_URL = `https://${chain}.api.oogabooga.io/v1/prices?currency=${currency}`; // using bera oogabooga price api
    const response = await fetch(API_URL,
        {
            method: 'GET',
            headers: { 
                "Authorization" : "Bearer" + `${process.env.OOGABOOGA_API_KEY}`, 
                "Accept": "*/*" 
            },
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
}