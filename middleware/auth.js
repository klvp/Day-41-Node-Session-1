/** @format */
import jwt from "jsonwebtoken";

export default function auth(request, response, next) {
  try {
    const token = request.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    response.send({ error: err.message });
  }
}
