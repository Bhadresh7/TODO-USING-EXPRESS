const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //   console.log(req.headers);
  //   console.log(req.body);
  // console.log(req.Authorization)
  //   console.log(req.params)
  // console.log(req.headers("Authorization"));

  const authHeader = req.header("Authorization");
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "INVALID_TOKEN",
      message: "Unauthorized: Missing or invalid token format",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = decode.id;
    console.log(`${req.id} request id 🔥🔥🔥🔥`);
    next();
  } catch (error) {
    console.error(error.message);
    return res
      .status(401)
      .json({ status: "INVALID_TOKEN", message: error.message });
  }
};
module.exports = { authMiddleware };
