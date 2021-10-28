export interface Prices {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  RateLimit: RateLimit;
  Data: Data;
}

interface Data {
  Aggregated: boolean;
  TimeFrom: number;
  TimeTo: number;
  Data: Price[];
}

interface Price {
  time: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  close: number;
  conversionType: string;
  conversionSymbol: string;
}

interface RateLimit {}
