import express from 'express';
import BTCPriceController from '../controllers/btc-price.controller';
const router = express.Router();

const userController = new BTCPriceController();

router.get('/price', userController.getPrice);
router.post('/prices', userController.getPrices);

export { router };
