import { Request, Response } from 'express';
import { httpError } from '../helpers/handleError';
import { getPrice, getPrices } from '../services/prices.service';

export default class BTCPriceController {
  /**
   * Gets price
   * @param req: Request
   * @param res: Response
   * @returns price
   */
  public async getPrice(req: Request, res: Response): Promise<void> {
    try {
      const urlConfig = {
        crypto: 'BTC',
        currencies: 'USD,EUR,COP',
      };
      const price = await getPrice(urlConfig.crypto, urlConfig.currencies);
      res.status(200).send(price);
    } catch (e: any) {
      httpError(res, e);
    }
  }

  /**
   * Gets prices
   * @param req: Request
   * @param res: Response
   * @returns prices
   */
  public async getPrices(req: Request, res: Response): Promise<void> {
    try {
      const urlConfig = {
        crypto: 'BTC',
        currency: 'USD',
        days: req.body.days ?? 10,
      };
      const prices = await getPrices(
        urlConfig.crypto,
        urlConfig.currency,
        urlConfig.days
      );
      const data = prices.Data.Data.map((price: any) => {
        const priceFormatted = { time: price.time, value: price.close };
        return priceFormatted;
      });
      res.status(200).send(data.slice(0, -1));
    } catch (e: any) {
      httpError(res, e);
    }
  }
}
