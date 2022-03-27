/** @format */

import { client } from "./index.js";

async function createMovies(newMovies) {
  return await client.db("b27we").collection("movies").insertMany(newMovies);
}

async function createUser(newUser) {
  return await client.db("b27we").collection("users").insertOne(newUser);
}

async function updateMovieByID(id, updatedData) {
  return await client
    .db("b27we")
    .collection("movies")
    .updateOne({ id: id }, { $set: updatedData });
}

async function deleteAllMovies() {
  return await client.db("b27we").collection("movies").deleteMany({});
}

async function deleteMovieByID(id) {
  return await client.db("b27we").collection("movies").deleteOne({ id: id });
}

async function getMovieByID(id) {
  return await client.db("b27we").collection("movies").findOne({ id: id });
}

async function getUserByName(username) {
  return await client
    .db("b27we")
    .collection("users")
    .findOne({ username: username });
}

async function getAllMovies() {
  return await client.db("b27we").collection("movies").find({}).toArray();
}

export {
  createMovies,
  updateMovieByID,
  deleteAllMovies,
  deleteMovieByID,
  getMovieByID,
  getAllMovies,
  createUser,
  getUserByName,
};
