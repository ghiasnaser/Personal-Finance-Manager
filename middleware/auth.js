const withAuth = (req, res, next) => {
  //redirect the request to the login route if the user is not logged in
  if (!req.session.loggedIn) {
    res.redirect('/');
  } else {
    next();
  }
};

const isLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    next();
  }
}

// Middleware to prevent access to routes and renders a page that requests the user to login or sign up
const authWall = (req, res, next) => {
  if (!req?.session?.loggedIn) {
    res.render('authWall', { layout: 'solo' });
    return;
  }
  next();
};

module.exports = { withAuth, authWall, isLoggedIn };
