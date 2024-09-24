const { User }  = require("../models/UserModel.js")
const bcrypt = require("bcrypt");
const tokenAndCookie = require("../token/token.js");
const jwt = require('jsonwebtoken');
//POST REQUEST Function in Controller folder
module.exports.Signup = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Check if passwords match
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({ fullName, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Send success response with new user info
    res.status(201).json({
      message: "User registered successfully",
      newUser: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.Login = async(req,res) =>{
    const {email,password} = req.body;
    try {
      const user = await User.findOne({email});
      //400->issue either already exist or do not match something condition-invalid data
      if(!user) return res.status(400).json({message: "User Not Found"});
       
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch) return res.status(400).json({message: "Incorrect password"});
       //token generate after login
      tokenAndCookie(user._id,res);
     
      res.status(200).json({message: "User LoggedIn successfully", user:{
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      }});
    
   
  
    } catch (error) {
      //500->internal server error
      res.status(500).json({error: error.message});
    }
  }


  
module.exports.getProfile = async (req, res) => {
    const token = req.cookies.token; // Extract token from cookies
    if (!token) {
      return res.status(403).json({ message: 'Authentication failed! No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id); // Fetch user by decoded id
  
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
  
      res.status(200).json({ user:{
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      }});
    } catch (err) {
      console.error('Error in Verifying token', err);
      return res.status(401).json({ message: 'Invalid token!' });
    }
  };


module.exports.Logout = async(req,res)=>{
    try{
      // to clear cookie from all routes path
       res.clearCookie('token', {path: '/'});
       res.status(200).json({message: "User Logged Out successfully"});
    } catch (error) {
      //500->internal server error
      res.status(500).json({error: error.message});
    }
  }
  