const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
var cors = require('cors')

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(userRouter);

app.listen(5100, () => {
  console.log('MyMusicStore API server is listening on port 5100')
})