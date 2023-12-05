const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

const secret = "mysecretsshhhhh";
const expiration = "2h";

function contextMiddleware({ req }) {
  let token = req.headers.authorization || "";

  if (!token) {
    return { user: null };
  }

  try {
    const { data } = jwt.verify(token, secret);
    const { username, email, _id } = data;
    const user = { username, email, _id };
    return { user };
  } catch (error) {
    throw new AuthenticationError("Invalid token");
  }
}

function signToken({ username, email, _id }) {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = { contextMiddleware, signToken };
