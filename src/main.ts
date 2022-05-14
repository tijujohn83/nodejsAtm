import * as express from 'express';
import { configOptions } from './config/config';
import { atmController } from './controllers/atmController';

async function main(): Promise<void> {
  const app = express.default();

  app.use(express.json());
  app.use('/atm/api/', atmController);

  app.listen(configOptions.port, () => {
    console.log(`Server is listening on port ${configOptions.port}`);
  });

  // graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    console.log('Express app closed.');
    process.exit(0);
  });

}

main();
