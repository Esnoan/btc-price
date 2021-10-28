import { Request, Response } from 'express';
import { httpError } from '../helpers/handleError';
import { getUSDExchangeRates } from '../services/exchange.service';

export default class USDExchangeRatesController {
  /**
   * getUSDExchangeRates
   * @param req: Request
   * @param res: Response
   * @returns price
   */
  public async getUSDExchangeRates(req: Request, res: Response): Promise<void> {
    try {
      const rates = await getUSDExchangeRates();
      const data = {
        EUR: rates.data['EUR'],
        COP: rates.data['COP'],
      };
      res.status(200).send(data);
    } catch (e: any) {
      httpError(res, e);
    }
  }
}
