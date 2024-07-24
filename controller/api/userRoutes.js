const router = require('express').Router();
const { User } = require('../../model')
const bcrypt = require('bcrypt');

// LOG IN USER 
router.get('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: {email:req.body.email}})
    if (!userData) {
    res
    .status(400)
    .json({ message: "Incorrect email or password"});
    return;
    }
    const validPassword = await userData.checkPassword(req.body.password)
    if (!validPassword) {
    res
    .status(400)
    .json({ message: "Incorrect email or password" });
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
// new user
  const { name, email, password } = req.body
  if (!name || !email || !password) {
  return res.status(400).json({ message: 'All fields are required' });
  }
// IF ALREADY EXIST IN DB
try {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
  return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });
  await newUser.save();
  res.status(201).json({ message: 'User created successfully' });
} catch (error) {
  res.status(500).json({ message: 'Error creating user', error });
}
})

module.exports = router;
 