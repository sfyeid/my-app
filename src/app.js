const express = require('express');
const session = require('express-session');
const { RedisStore } = require('connect-redis');
const { createClient } = require('redis');

const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const db = require('./db/db');

const app = express();

const redisClient = createClient({
  url: 'redis://redis:6379'
});

redisClient.on('error', (err) => console.error('Redis error:', err));

(async () => {
  await redisClient.connect();
})();

app.use(
  session({
    store: new RedisStore({
      client: redisClient
    }),
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.json());

app.get('/visit', (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.json({ visits: req.session.views });
});

app.use('/users', userRoutes);

const start = async () => {
  try {
    await db.init();

    console.log(`Release version: ${process.env.APP_VERSION || 'dev'}`);
    console.log(`Environment: ${process.env.APP_ENV || 'local'}`);

    app.listen(config.port, '0.0.0.0', () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();