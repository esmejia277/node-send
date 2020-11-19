const express = require('express');

// create server
const app = express();

// port
const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server ok in ${port}`)
});
