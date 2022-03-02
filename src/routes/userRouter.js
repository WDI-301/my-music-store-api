const express = require('express');


const userRouter = express.Router();

userRouter.post('/create-user', (req, res) => {
 
  const user = req.body.user;

  // TODO: Save User in the Database

  res.send('user created');
});

userRouter.post('/sign-in', (req, res) => {

 
  const userCredentials = req.body.userCredentials;
  console.log('userCredentials: ', userCredentials);

  // TODO: get the user from the Database
  // TODO: verify that the credentials match
  // TODO: return that user in the response
  
  const fakeUserData = {
    id: '001',
    email: 'fake@user.com',
    firstName: 'Peter',
    lastName: 'Parker',
  };

  res.send(fakeUserData);
});

module.exports = userRouter;