// Main hbs middleware for the app This will inject variables into the hbs templates for use in the views

/* 
 Usage: 
    Setting the res.locals object in the middleware will make the variables available to all hbs templates
    res.locals.<variable> = <value>

    Adding more variables to the res.locals object will make them available to all hbs templates
    just add them before the next() function call
*/
const hbsMiddleware = (req, res, next) => {
  //Setting the links that are going to be used in the navbar
  const links = [
    { href: '/', text: 'Home' },
    { href: '/dashboard', text: 'Dashboard' },
    { href: '/dashboard/payments', text: 'Payments' },
    { href: '/dashboard/recurring', text: 'Recurring' },
    { href: '/dashboard/accounts', text: 'Accounts' },
  ];

  //Setting the active link in the navbar based on the current path
  links.map((link) => {
    link.active = req.path === link.href ? true : false;
  });
  //Setting the links variable to be used in the hbs templates
  res.locals.links = links;
  res.locals.user = req.session.user;
  res.locals.loggedIn = req.session.loggedIn;
  next();
};

module.exports = hbsMiddleware;
