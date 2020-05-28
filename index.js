const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/usersRoute');
const profileRoute = require('./src/routes/profilesRoute');
const postsRoute = require('./src/routes/postsRoute');
const authRoute = require('./src/routes/authRoute');
const app = express();
const PORT = process.env.PORT || 5000;

// BodyParser middleware configuration
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json({}));
// setup mongodb connection
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/socialNetworkMedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Mongoose connection setup');
});
// Route Middleware
app.use('/api/auth/', authRoute);
app.use('/api/users/', userRoutes);
app.use('/api/profile/', profileRoute);
app.use('/api/posts/', postsRoute);
app.get('/', (req, res, next) => {
  res.send('Root call');
  next();
});
app.listen(PORT, () => {
  console.log(`Node server and express running on ${PORT}`);
});