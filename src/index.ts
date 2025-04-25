// import express from 'express';
// import dotenv from 'dotenv';
// import { AuthRouter } from './routers/auth.router';

// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use('/api/auth', AuthRouter);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import App from './app';

const main = () => {
  // init db here

  const app = new App();
  app.start();
};

main();
