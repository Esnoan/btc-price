import { AxiosRequestConfig } from 'axios';
import { getPricesURL, getPriceURL } from '../constants/url';
import HttpClient from '../http/http.client';

import { Price } from '../models/Price';
import { Prices } from '../models/Prices';

/**
 * getPrice
 * @description Get current bitcoin price in USD, EUR, COP
 */
export const getPrice = async (
  crypto: string,
  currencies: string
): Promise<Price> => {
  const config: AxiosRequestConfig = {
    url: getPriceURL(crypto, currencies),
    method: 'GET',
  };
  const response = await HttpClient(config);
  const data = response.data as Price;
  return data;
};

/**
 * getPrices
 * @description Get list bitcoin prices
 */
export const getPrices = async (
  crypto: string,
  currency: string,
  days: number
): Promise<Prices> => {
  const config: AxiosRequestConfig = {
    url: getPricesURL(crypto, currency, days),
    method: 'GET',
  };
  const response = await HttpClient(config);
  const data = response.data as Prices;
  return data;
};
