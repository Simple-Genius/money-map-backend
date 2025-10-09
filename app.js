require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./server/config/db');
const transactionsRoute = require('./server/routes/transaction_routes');
const userRoute = require('./server/routes/user_routes');

// middleware
app.use(express.json());
app.use('/api/transactions', transactionsRoute);
app.use('/api/users', userRoute);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is runnning on port ${process.env.PORT}`);
});
