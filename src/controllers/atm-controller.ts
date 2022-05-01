import * as express from 'express';

export const atmController = express.Router();

atmController.get("/balance", (req, res) => {
    const balance = [
      {
        id: 1,
        name: "hammer",
      },
      {
        id: 2,
        name: "screwdriver",
      },
      ,
      {
        id: 3,
        name: "wrench",
      },
    ];
 
   res.json(balance);
 });
