const router = require('express').Router();
const registerValidation = require('../validation').registerValidation;
const loginValidation    = require('../validation').loginValidation;
const User = require('../models/').User;
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
  console.log('Receiving a request related to auth...');
  next();
});

// 獲取目前登入的使用者（需要驗證）
router.get('/testAPI', (req, res) => { // jwt - 3
  return res.send('Successfully connected to the auth route...');
});

router.post('/register', async (req, res) => { 
  // Check if the data meets the standards
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the email has already been registered
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('This email has already been registered...');

  // Create a new user
  let { username, email, password } = req.body;
  let newUser = new User({ username, email, password });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: 'User saved successfully.',
      savedUser,
    });
  } catch (e) {
    return res.status(500).send('Unable to save user....');
  }
});

router.post('/login', async (req, res) => { 
  // Check if the data meets the standards
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the email has already been registered
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) return res.status(401).send('User not found, Please verify if the email is correct...');

  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);
  
    if (isMatch) {
      // 製作 json web token
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token       = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        message: 'Login successful',
        token: 'JWT ' + token, 
        user: foundUser,
      });
    } else {
      return res.status(401).send('Incorrect password...');
    };
  });
});

module.exports = router;