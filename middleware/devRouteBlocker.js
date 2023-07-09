const devRouteBlocker = (req, res, next) => {
  if (process.env.NODE_ENV !== 'development') {
    res.status(400).send('Only for Development');
    return;
  }
  next();
};

module.exports = devRouteBlocker;
