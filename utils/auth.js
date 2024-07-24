// if not logged in session, redirect to login page
// If the user is not logged in, redirect the request to the login route

const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;