
export async function fetchTokenHistoryDataFromCoinGecko(id: string, contract_address: string, days = 30, vs_currency = 'usd') {
  const API_URL = `https://api.coingecko.com/api/v3/coins/${id}/contract/${contract_address}/market_chart?vs_currency=${vs_currency}&days=${days}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': process.env.COIN_GECKO_FREE_DATA_API ?? ''
    }
  };

  try {
    const response = await fetch(API_URL, options);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}