/** @format */

// importing 3rd party package
//const express = require("express"); //"type": "commonjs", comman way of importing package or module

import express from "express"; //"type": "module" latest way of importing moduleor package

import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config(); //config will read your .env file, parse the contents, assign it to process.env

import cors from "cors";

import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";

const app = express(); //creating express app

// const PORT = 4000; //port number to listen express
const PORT = process.env.PORT; //port number to listen express

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is Connected 👍");
  return client;
}

export const client = await createConnection();

app.use(cors());
// app.use() --->  it will interfere while sending request
// express.json()  --> it converts data into json format
app.use(express.json());

app.get("/", function (request, response) {
  response.send("Hello World this is KLVP");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`Server started in ${PORT} port`));
