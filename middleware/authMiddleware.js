const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // User is authenticated
  } else {
    res.redirect('/login');
  }
};

module.exports = authMiddleware;