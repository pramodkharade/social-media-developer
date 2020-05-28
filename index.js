const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// setup mongodb connection
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/socialNetworkMedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Mongoose connection setup');
});

app.listen(PORT, () => {
  console.log(`Node server and express running on ${PORT}`);
});