const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30m" },
  );

  return token
};


module.exports = {generateAccessToken};
