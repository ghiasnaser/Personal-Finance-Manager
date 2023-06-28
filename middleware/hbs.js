const hbsMiddleware = (req, res, next) => {
  const links = [
    { href: '/', text: 'Home' },
    { href: '/dashboard', text: 'Dashboard' },
    { href: '/dashboard/payments', text: 'Payments' },
    { href: '/dashboard/recurring', text: 'Recurring' },
    { href: '/dashboard/accounts', text: 'Accounts' },
  ];
  links.map((link) => {
    link.active = req.path === link.href ? true : false;
  });
  res.locals.links = links;
  next();
};

module.exports = hbsMiddleware;
