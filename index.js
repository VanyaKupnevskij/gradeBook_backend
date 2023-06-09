require('express-async-errors');
const express = require('express');

const recordRouter = require('./routers/record.route.js');
const authRouter = require('./routers/auth.route.js');

const cors = require('./middlewares/cors.middleware.js');
const error = require('./middlewares/error.middleware.js');
const config = require('config');
const path = require('path');

const mongoose = require('mongoose');

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
