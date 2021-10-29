import { nanoid } from 'nanoid';
export class PricesModel {
  id: string;
  time: number;
  value: number;

  constructor(time: number, value: number) {
    this.id = nanoid();
    this.time = time;
    this.value = value;
  }
}
