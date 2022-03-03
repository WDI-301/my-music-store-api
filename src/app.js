require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
var cors = require('cors');
const productRouter = require('./routes/productRouter');

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(() => console.log('connected to databasew successfully'))
.catch(() => console.log('did NOT connected to databasew successfully'));

const app = express();
app.use(cors());

app.use(bodyParser.json());

// Attach routers to our app
app.use(userRouter);
app.use(productRouter);

app.listen(5100, () => {
  console.log('MyMusicStore API server is listening on port 5100')
})