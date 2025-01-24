const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.error("Error generating token ", error.message);
    throw new Error("Token generation failed");
  }
};

module.exports = generateToken;
