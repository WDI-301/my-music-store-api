require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
var cors = require('cors');

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(() => console.log('connected to databasew successfully'))
.catch(() => console.log('did NOT connected to databasew successfully'));

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(userRouter);

app.listen(5100, () => {
  console.log('MyMusicStore API server is listening on port 5100')
})