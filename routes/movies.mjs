import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  body,
  matchedData,
} from "express-validator";
import { movies } from "../utils/constants.mjs";
import { createMovieValidationSchema } from "../utils/validationShemas.mjs";
import { resolveMovieById } from "../utils/middlewares.mjs";

const router = Router();

router.get(
  "/api/movies",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be atleast 3-10 characters"),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req;
    const parsedValue = parseInt(value);
    if (filter && parsedValue)
      return res.send(
        movies.filter((movie) => movie[filter].includes(parsedValue))
      );
    return res.send(movies);
  }
);

router.get("/api/movies/:id", resolveMovieById, (req, res) => {
  const { findMovieIndex } = req;
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const movie_req = movies.find((movie) => {
    if (movie.id === parsedId) return movie;
  });

  if (movie_req) return res.status(200).json(movie_req);
  return res.sendStatus(404);
});

router.post(
  "/api/movies",
  checkSchema(createMovieValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);

    console.log(data);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    const newMovie = { id: movies[movies.length - 1].id + 1, ...data };
    movies.push(newMovie);
    return res.status(201).send(newMovie);
  }
);

router.put("/api/movies/:id", resolveMovieById, (req, res) => {
  const { body, findMovieIndex } = req;

  movies[findMovieIndex] = { id: movies[findMovieIndex].id, ...body };
  return res.sendStatus(200);
});

router.patch("/api/movies/:id", (req, res) => {
  const { body, findMovieIndex } = req;

  movies[findMovieIndex] = { ...movies[findMovieIndex], ...body };
  res.sendStatus(200);
});

router.delete("/api/movies/:id", resolveMovieById, (req, res) => {
  const { findMovieIndex } = req;
  movies.splice(findMovieIndex, 1);
  return res.sendStatus(200);
});

export default router;
