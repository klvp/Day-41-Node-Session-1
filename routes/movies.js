/** @format */

import express from "express"; //"type": "module" latest way of importing moduleor package

import {
  createMovies,
  updateMovieByID,
  deleteAllMovies,
  deleteMovieByID,
  getMovieByID,
  getAllMovies,
} from "../helper.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async function (request, response) {
  const movies = await getAllMovies(); //mongoDB fetch only first 20 documents and returns cursor so we get error, toArray() is used here to get the entire data
  response.send(movies);
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;
  // const movie = movies.find((movie) => movie.id == id);
  const movie = await getMovieByID(id);
  // response.send(...movies.filter((movie) => movie.id == id));   using filter method
  // response.send(movies.find((movie) => movie.id == id)));    using find method
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "No such movie is found 😜" });
});

// create movies

router.post("/", async function (request, response) {
  const newMovies = request.body;
  console.log(newMovies);
  const result = await createMovies(newMovies);
  response.send(result);
});

// Delete movies from mongoDB database

router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  const result = await deleteMovieByID(id);
  response.send(result);
});

router.delete("/", async function (request, response) {
  // const { id } = request.params;
  const result = await deleteAllMovies();
  response.send(result);
});

// update data in the mongoDB

router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const updatedData = request.body;
  const result = await updateMovieByID(id, updatedData);
  response.send(result);
});

export const moviesRouter = router;
