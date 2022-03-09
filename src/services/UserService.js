const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");


const createUser = (req, res, next) => {
 try {
  const user = req.body.user;

  // Save User in the Database

  // 3. use the Data Model we created to create mongo db documents
  const newUser = new UserModel({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  });
  
  // 4. save your user as a mongo db document.
  newUser.save().then((savedUser) => {
    console.log('savedUser: ', savedUser);

    // A user object without the extra fields
    const cleanSavedUser = {
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
    }
  
    res.send(cleanSavedUser);
  });
}catch(error){
  next(error);
}

};





const signIn = async (req, res, next) => {
  try {
    const userCredentials = req.body.userCredentials;
  
    // get the user from the Database
    // verify that the credentials match
    const foundUser = await UserModel.findOne({ email: userCredentials.email, password: userCredentials.password })
  
    if(!foundUser){
      throw new Error("User not found")
    }
    
    // Create JWT
    const token = jwt.sign({
      userId: foundUser.id,
      iat: Date.now(),
    }, process.env.AUTH_SECRET_KEY);
  
    // clean the fields that we dont need to provide to the front end
    const cleanFoundUser = {
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
    }
  
    // create JWT token to give to the user makign the request.
  
    res.cookie('session_token', token, { secure: false, httpOnly: true });
    
    res.send({user: cleanFoundUser});
  } catch (error){
    next(error)
  }
};

const signOut = (req, res) => {
  res.clearCookie('session_token').send('Sign out successfully');
};

const UserService = {
  createUser,
  signIn,
  signOut,
}

module.exports = UserService;
