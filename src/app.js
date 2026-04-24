const express = require('express');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const db = require('./db/db');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

const start = async () => {
  try {
    await db.init();

    app.listen(config.port, '0.0.0.0', () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();