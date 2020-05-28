const jwt = require('jsonwebtoken');

module.exports = authVerify = (req, res, next) => {
  // get the token from header
  const token = req.header('auth-token');

  //check if not token
  if (!token) {
    return res.status(401).json({
      msg: "no token, authorization denied"
    });
  }

  // decode the token by verifying
  try {
    const decode = jwt.verify(token, "mynodeAPISecret");
    req.user = decode.user;
    next();
  } catch (error) {
    return res.status(402).json({
      msg: "token is not valid"
    });
  }

};