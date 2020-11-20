const express = require('express');
const connectDB = require('./config/db');


// create server
const app = express();

// connect to DB
connectDB();

// port
const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server ok in ${port}`)
});
