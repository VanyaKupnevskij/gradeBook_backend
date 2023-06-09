import express from 'express';
import 'express-async-errors';

import recordRouter from './routers/record.route.js';
import authRouter from './routers/auth.route.js';

import cors from './middlewares/cors.middleware.js';
import error from './middlewares/error.middleware.js';
import config from 'config';
import * as path from 'path';

import mongoose from 'mongoose';

const app = express();

const PORT = config.get('port') || 4444;

app.use(cors);
app.use(express.json({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/records/', recordRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve('client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

app.use(error);

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => console.log(`Server start OK on port: ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
}

start();
