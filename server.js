const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const bcrypt = require('bcryptjs');
const redisClient = require('./utils/redisClient');
const {connectWithRetry } = require('./utils/mysqlClient');
const User = require('./models/user');
const authMiddleware = require('./middleware/authMiddleware'); // Adjust path as needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// Express session middleware
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "views" directory
app.use(express.static('views'));

app.use('/', require('./routes/auth'));


connectWithRetry()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });