const isAuth = (req, res, next) => {
  console.log(req, res);
  next();
};

module.exports = isAuth;
