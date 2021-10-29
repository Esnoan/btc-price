import app from '../src/app';
import request from 'supertest';

describe('BTC Price Routes', () => {
  describe('Single BTC Price', () => {
    test('Price includes USD, EUR, COP currencies', async () => {
      const res = await request(app).get('/api/btc/price').send();
      expect(res.statusCode).toBe(200);
      expect(res.body.USD).not.toBeNaN();
      expect(res.body.EUR).not.toBeNaN();
      expect(res.body.COP).not.toBeNaN();
      expect(res.body.CAD).toBeUndefined();
    });
    test('Price does not include the CAD currency', async () => {
      const res = await request(app).get('/api/btc/price').send();
      expect(res.statusCode).toBe(200);
      expect(res.body.CAD).toBeUndefined();
    });
  });

  describe('List BTC Prices', () => {
    test('Get default quantity prices', async () => {
      const res = await request(app).post('/api/btc/prices').send();
      expect(res.statusCode).toBe(200);
      expect(res.body.USD).toBeUndefined();
      expect(res.body.length).toBe(10);
    });

    test('post prices with more quantity', async () => {
      const res = await request(app).get('/api/btc/prices').send({ days: 20 });
      expect(res.statusCode).toBe(200);
      expect(res.body.USD).toBeUndefined();
      expect(res.body.length).toBe(20);
    });
  });
});
