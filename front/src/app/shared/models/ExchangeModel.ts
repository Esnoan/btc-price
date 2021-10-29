import { nanoid } from 'nanoid';
export class ExchangeModel {
  id: string;
  COP: number;
  EUR: number;

  constructor(COP: number, EUR: number) {
    this.id = nanoid();
    this.COP = COP;
    this.EUR = EUR;
  }
}
