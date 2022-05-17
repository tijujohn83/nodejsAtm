import * as express from 'express';
import { RequestBody } from '../models/requestBody';
import { AtmManager } from '../services/atmManager';

export const atmController = express.Router();

const atmManager = new AtmManager();

atmController.post('/withdraw', (req, res) => {
  console.dir(req);
  const amountJson: RequestBody = req.body;
  if (amountJson?.amount !== undefined && amountJson.amount % 1 === 0 && amountJson.amount > 0) {
    res.json(atmManager.withDraw(amountJson.amount));
  } else {
    res.statusMessage = 'Bad Request. Please specify a positive integer amount.';
    res.status(400).end();
  }
});

atmController.get('/balances', (req, res) => {
  res.json(atmManager.getBalances());
});

atmController.get('/balanceAmount', (req, res) => {
  res.json(atmManager.getBalanceValue());
});

atmController.post('/refill', (req, res) => {
  res.json(atmManager.refill());
});
