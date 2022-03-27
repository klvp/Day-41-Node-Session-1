/** @format */

import express from "express"; //"type": "module" latest way of importing moduleor package

import { createUser, getUserByName } from "../helper.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const router = express.Router();

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(no of salts)
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt, hashedPassword);
  return hashedPassword;
}

// create user

router.post("/signup", async function (request, response) {
  const { username, password } = request.body;
  const hashedpassword = await genPassword(password);
  const newUser = { username: username, password: hashedpassword };
  console.log(newUser);
  const result = await createUser(newUser);
  response.send(result);
});

//login user
router.post("/login", async function (request, response) {
  const { username, password } = request.body;
  const userFromDB = await getUserByName(username);
  console.log(userFromDB);
  // if (!userFromDB) {
  //   response.status(401).send({ message: "Invalid Credentials" });
  // } else {
  //   const isPasswordMatch = await bcrypt.compare(password, userFromDB.password);
  //   if (isPasswordMatch) {
  //     response.send({ message: "Login Success" });
  //   } else {
  //     response.status(401).send({ message: "Invalid Credentials" });
  //   }
  // }

  if (userFromDB) {
    const isPasswordMatch = await bcrypt.compare(password, userFromDB.password);
    if (isPasswordMatch) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      response.send({ message: "Login Success", token: token });
    } else {
      response.status(401).send({ message: "Invalid Credentials" });
    }
  } else {
    response.status(401).send({ message: "Invalid Credentials" });
  }
});

export const usersRouter = router;
