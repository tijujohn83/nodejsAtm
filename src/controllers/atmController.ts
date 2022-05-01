import * as express from 'express';
import { RequestBody } from '../models/requestBody';
import { AtmService } from '../services/atmService';

export const atmController = express.Router();

const atmManager = new AtmService();

atmController.post("/withdraw", (req, res) => {
  var amountJson: RequestBody = JSON.parse(req.body);
  if (amountJson?.amount !== undefined && amountJson.amount % 1 === 0) {
    res.json(atmManager.getInstance().withDraw(amountJson.amount));
  }
  else {
    res.statusMessage = "Bad Request. Please specify an integer amount.";
    res.status(400).end();
  }
});

atmController.get("/balance", (req, res) => {
  res.json(atmManager.getInstance().getBalances());
});
