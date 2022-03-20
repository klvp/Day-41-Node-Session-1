/** @format */

// importing 3rd party package
//const express = require("express"); //"type": "commonjs", comman way of importing package or module

import express from "express"; //"type": "module" latest way of importing moduleor package

import { MongoClient } from "mongodb";

import dotenv from "dotenv";

import cors from "cors";

dotenv.config(); //config will read your .env file, parse the contents, assign it to process.env

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

const client = await createConnection();

app.use(cors());
// app.use() --->  it will interfere while sending request
// express.json()  --> it converts data into json format
app.use(express.json());

app.get("/", function (request, response) {
  response.send("Hello World this is KLVP");
});

app.get("/movies", async function (request, response) {
  const movies = await client
    .db("b27we")
    .collection("movies")
    .find({})
    .toArray(); //mongoDB fetch only first 20 documents and returns cursor so we get error, toArray() is used here to get the entire data
  response.send(movies);
});

app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  // const movie = movies.find((movie) => movie.id == id);
  const movie = await client
    .db("b27we")
    .collection("movies")
    .findOne({ id: id });
  // response.send(...movies.filter((movie) => movie.id == id));   using filter method
  // response.send(movies.find((movie) => movie.id == id)));    using find method
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "No such movie is found 😜" });
});

// create movies

app.post("/movies", async function (request, response) {
  const newMovies = request.body;
  console.log(newMovies);
  const result = await client
    .db("b27we")
    .collection("movies")
    .insertMany(newMovies);
  response.send(result);
});

// Delete movies from mongoDB database

app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("b27we")
    .collection("movies")
    .deleteOne({ id: id });
  response.send(result);
});

app.delete("/movies", async function (request, response) {
  // const { id } = request.params;
  const result = await client.db("b27we").collection("movies").deleteMany({});
  response.send(result);
});

// update data in the mongoDB

app.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const updatedData = request.body;
  const result = await client
    .db("b27we")
    .collection("movies")
    .updateOne({ id: id }, { $set: updatedData });
  response.send(result);
});

app.listen(PORT, () => console.log(`Server started in ${PORT} port`));
