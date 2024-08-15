const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post , User , Comment } = require('../model');


// TO RENDER HOME PAGE
router.get('/', async (req, res) => {
  try {
    // GET ALL POST FOR USER LOGGED IN
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["name"]}],
    })
    const posts = postData.map((post) => post.get({plain: true}))
    res.render('home', {
      posts,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }    
})


// IF LOGGED IN REDIRECT TO DASHBOARD
router.get('/login', (req, res) => {
  // if (req.session.logged_in){
  //   res.redirect('dashboard')
  //   return
  // }
  res.render('login')
})


// ONCE SIGNED UP REDIRECT TO DASHBOARD
router.get('/signup', (req, res) => {
  // if (req.session.logged_in){
  //   res.redirect('signup')
  //   return
  // }
  res.render('signup')
})


// TO RENDER NEW POST PAGE
router.get('/newpost', (req, res) => {
  if (req.session.logged_in){
    res.render('newpost')
    return
  }
  res.redirect('/login')
})


// TO RENDER SINGLE POST 
router.get('/post/:id', withAuth, async (req,res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model : User, attributes: ['username']},
        { model: Comment, include: [{ model: User, attributes: ['username']}]}
      ]
    })
    const post = postData.map((post) => post.get({plain: true}))
    res.render( 'post', {...post, logged_in: req.session.logged_in} )
  }catch (err) {
    res.status(500).json(err)
  }
})


// TO RENDER NEW POST
router.get('/editpost/:id', async (req, res) => {
try {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      { model: User, attributes: ['name']},
      { model: Comment, include: [{ model: User, attributes: ['name']}]}
      ]
  })
  const post = postData.get({plain: true})
  res.render('editpost', { ...post, logged_in: req.session.logged_in } )
} catch (error) {
  res.status(500).json(error)
  }
})


// RENDER DASHBOARD
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['name'] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;