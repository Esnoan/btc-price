export const BASE_URL = 'https://min-api.cryptocompare.com/data';

/**
 * getPriceURL
 * @description Returns the URL for the current price of bitcoin
 */
const getPriceURL = (crypto: string, currencies: string): string => {
  return `${BASE_URL}/price?fsym=${crypto}&tsyms=${currencies}`;
};

/**
 * getPricesURL
 * @description Returns the URL for the list prices of bitcoin
 */
const getPricesURL = (
  crypto: string,
  currency: string,
  days: number
): string => {
  const apiKey = process.env.API_KEY;
  return `${BASE_URL}/v2/histoday?fsym=${crypto}&tsym=${currency}&limit=${days}&toTs=-1&api_key=${apiKey}`;
};

const getUSDExchangeRateURL = () => {
  const apiKey = process.env.API_KEY_EXCHANGE;
  return `https://freecurrencyapi.net/api/v2/latest?apikey=${apiKey}`;
};

export { getPriceURL, getPricesURL, getUSDExchangeRateURL };
