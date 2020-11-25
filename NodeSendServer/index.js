const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// create server
const app = express();

// configure cors
const configCors = {
  origin: process.env.FRONTEND_URL
}
app.use( cors(configCors) );

// connect to DB
connectDB();

// port
const port = process.env.PORT || 4000;

// read data from json
app.use(express.json())


// endpoints
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));




// run app
app.listen(port, '0.0.0.0', () => {
  console.log(`Server ok in ${port}`)
});
