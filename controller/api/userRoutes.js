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
    const userData = await User.findOne({ where: {username:req.body.username}})

    if (!userData) {
      res
      .status(400)
      .json({ message: "Incorrect username"});
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
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res
    .status(200)
    .json({ user: userData, message: "LOG IN SUCCESSFUL" });
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

    const { username, password } = req.body

  if (!username|| !password) {
  return res.status(400).json({ message: 'All fields are required' })
  }

  // IF ALREADY EXIST IN DB
  try {
  const existingUser = await User.findOne({ where: {username} })
  if (existingUser) {
  return res.status(400).json({ message: 'User already exists' })
  }

  const newUser = new User({
    username,
    password
  });

  await newUser.save();

  req.session.save(() => {
    req.session.user_id = newUser.id;
    req.session.logged_in = true;
    res
    .status(200)
    .json({ user: newUser, message: "LOG IN SUCCESSFUL" });
    });

  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error })
  }
})

module.exports = router;
 