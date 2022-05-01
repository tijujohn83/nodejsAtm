import * as express from 'express';
import { RequestBody } from '../models/request-body';
import { AtmService } from '../services/atm-service';

export const atmController = express.Router();

const atmManager = new AtmService();

atmController.post("/withdraw", (req, res) => {
  var amountJson: RequestBody = JSON.parse(req.body);
  if (amountJson?.amount !== undefined) {
    res.json(atmManager.withDraw(amountJson.amount));
  }
  else {
    res.statusMessage = "Bad Request. Please specify the amount.";
    res.status(400).end();
  }
});

atmController.get("/balance", (req, res) => {
  res.json(atmManager.getBalances());
});
