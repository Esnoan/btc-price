export interface Exchange {
  query: Query;
  data: { [key: string]: number };
}

interface Query {
  apikey: string;
  timestamp: number;
  base_currency: string;
}
