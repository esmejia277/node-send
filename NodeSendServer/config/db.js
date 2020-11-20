const mongoose = require('mongoose');

require('dotenv').config({
  path: 'vars.env'
});



const connectDB = async () => {

  try {
    await mongoose.connect( process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    });
    console.log('Connected to DB');
    
  } catch (error) {
    console.log('Error', error)
    process.exit(1);
  }
}

module.exports = connectDB