require('dotenv').config()
const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userRouter = require('./routes/userRouter');
var cors = require('cors');
const productRouter = require('./routes/productRouter');
const UserModel = require('./models/UserModel');

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(() => console.log('connected to databasew successfully'))
.catch(() => console.log('did NOT connected to databasew successfully'));

const app = express();
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));

app.use(cookieParser())

app.use(bodyParser.json());

// Authorization middleware
app.use(async (req, res, next) => {
  // See who is the user making the request
  const sessionToken = req.cookies.session_token;

  if(!sessionToken){
    next();
    return;
  }

  // Asigning a user to the req object
  const { userId } = jwt.verify(sessionToken, process.env.AUTH_SECRET_KEY);
        
  const user = await UserModel.findOne({ id: userId });

  req.user = user; 

  next();
});

// Attach routers to our app
app.use(userRouter);
app.use(productRouter);

app.listen(5100, () => {
  console.log('MyMusicStore API server is listening on port 5100')
})