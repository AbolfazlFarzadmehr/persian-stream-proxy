import app from './src/app.js';
import { port } from './src/config.js';

process.on('uncaughtExeption', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXEPTION! SHUTING DOWN...');
  process.exit(1);
});

const server = app.listen(port, () =>
  console.log(`proxy server started at: http://127.0.0.1:${port}`)
);

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDELD REGECTION! SHUTING DOWN...');
  server.close(() => process.exit(1));
});
