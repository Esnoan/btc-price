import { nanoid } from 'nanoid';
export class PriceModel {
  id: string;
  USD: number;
  COP: number;
  EUR: number;

  constructor(USD: number, COP: number, EUR: number) {
    this.id = nanoid();
    this.USD = USD;
    this.COP = COP;
    this.EUR = EUR;
  }
}
