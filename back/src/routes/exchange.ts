import express from 'express';
import USDExchangeRatesController from '../controllers/exchange.contoller';
const router = express.Router();

const usdExchangeController = new USDExchangeRatesController();

router.get('/USD', usdExchangeController.getUSDExchangeRates);

export { router };
