const router = require('express').Router();
const { User } = require('../../model')
const bcrypt = require('bcrypt');

// GET ALL USERS
router.get('/', async (req, res) => {    
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
})

// LOG IN USER 
router.post('/login', async (req, res) => {
  try {

    const userData = await User.findOne({ where: {email:req.body.email}})
    console.log(userData);

    if (!userData) {
      res
      .status(400)
      .json({ message: "Incorrect email"});
    return;
    }

    const validPassword = await userData.checkPassword(req.body.password)

    if (!validPassword) {
      res
      .status(400)
      .json({ message: "Incorrect password" });
      return;
    }

  req.session.save(() => {
    req.session.user_id = userData.user_id;
    req.session.logged_in = true;
    res
    .status(200)
    .json({ user: userData, message: "LOG IN SUCCESSFUL" });
    console.log('loggedIn')
    });

    } catch (err) {
      res.status(400).json(err)
    }   
     
  });
  
//LOGOUT
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
    res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// SIGN UP
router.post('/signup', async (req, res) => {
// new user
    const { name, email, password } = req.body

console.log('Request body:', req.body);

  
    if (!name || !email || !password) {

console.log('Missing fields:', { name, email, password });

  return res.status(400).json({ message: 'All fields are required' });
  }
// IF ALREADY EXIST IN DB
try {
  const existingUser = await User.findOne({ where: {email: req.body.email} });
  if (existingUser) {

console.log('User already exists with email:', email);

  return res.status(400).json({ message: 'User already exists' });
  }
  // const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password
  });

console.log('New user:', newUser);

  await newUser.save();
  res.status(201).json({ message: 'User created successfully' });
} catch (error) {

console.error('Error creating user:', error);

  res.status(500).json({ message: 'Error creating user', error });
}
})

module.exports = router;
 