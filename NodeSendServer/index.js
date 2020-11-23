const express = require('express');
const connectDB = require('./config/db');


// create server
const app = express();



// connect to DB
connectDB();

// port
const port = process.env.PORT || 4000;

// read data from json
app.use(express.json())


// endpoints
app.use('/api/usuarios', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));


// run app
app.listen(port, '0.0.0.0', () => {
  console.log(`Server ok in ${port}`)
});
