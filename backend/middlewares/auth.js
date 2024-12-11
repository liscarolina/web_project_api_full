require("dotenv").config();
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(403).send({ message: "Autorización requerida" });
  }
  const token = authorization.replace("Bearer", "");
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    return res.status(403).send({ message: "Autorización requerida" });
  }
  req.user = payload;
  next();
};

module.exports = { auth };
