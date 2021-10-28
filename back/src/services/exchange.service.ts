import { AxiosRequestConfig } from 'axios';
import { getUSDExchangeRateURL } from '../constants/url';
import HttpClient from '../http/http.client';
import { Exchange } from '../models/Exhange';

/**
 * getUSDExchangeRates
 * @description Get the exchange rates for USD
 */
export const getUSDExchangeRates = async (): Promise<Exchange> => {
  const config: AxiosRequestConfig = {
    url: getUSDExchangeRateURL(),
    method: 'GET',
  };
  const response = await HttpClient(config);
  const data = response.data as Exchange;
  return data;
};
