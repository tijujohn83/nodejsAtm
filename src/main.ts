import * as express from 'express';

async function main() {
  const app = express.default();
  
  var config = {
    port:3000
  }

  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });

  // graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    console.log('Express app closed.');
    process.exit(0);
  });

}

main();
