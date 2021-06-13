const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');
const verify = require('./verifyToken');
//require('dotenv/config');

//Register
router.post('/register', async (req,res) => {
    //Validate data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Check if user already in db
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already in use');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req,res) => {
    //Validate data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Check if user exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email is not valid');

    //Check the password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Password is not valid');


    //Create a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token); 
});

//Get all users
router.get('/', verify, async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(400).send(err);
    }
});
    
    

module.exports = router;