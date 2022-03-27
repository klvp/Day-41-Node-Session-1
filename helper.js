/** @format */

import { ObjectId } from "mongodb";
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
    .updateOne({ _id: ObjectId(id) }, { $set: updatedData });
}

async function deleteAllMovies() {
  return await client.db("b27we").collection("movies").deleteMany({});
}

async function deleteMovieByID(id) {
  return await client
    .db("b27we")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}

async function getMovieByID(id) {
  return await client
    .db("b27we")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
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
