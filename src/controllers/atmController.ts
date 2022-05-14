import * as express from 'express';
import { RequestBody } from '../models/requestBody';
import { AtmService } from '../services/atmService';

export const atmController = express.Router();

const atmManager = new AtmService();

atmController.post('/withdraw', (req, res) => {
  console.dir(req);
  const amountJson: RequestBody = req.body;
  if (amountJson?.amount !== undefined && amountJson.amount % 1 === 0 && amountJson.amount > 0) {
    res.json(atmManager.getInstance().withDraw(amountJson.amount));
  } else {
    res.statusMessage = 'Bad Request. Please specify a positive integer amount.';
    res.status(400).end();
  }
});

atmController.get('/balances', (req, res) => {
  res.json(atmManager.getInstance().getBalances());
});

atmController.get('/balanceAmount', (req, res) => {
  res.json(atmManager.getInstance().getBalanceValue());
});
