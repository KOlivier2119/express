const express = require("express");
const app = express();

app.use(express.json());

const movies = [
  { id: 1, year: "2024", name: "Lift" },
  { id: 2, year: "2024", name: "Kung Fu Panda" },
  { id: 3, year: "2024", name: "Bad Boys" },
  { id: 4, year: "2024", name: "Mad Max" },
  { id: 5, year: "2024", name: "Infinite" },
  { id: 6, year: "2023", name: "Gemini" },
];

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.json({ msg: "Home Page" });
});

app.get("/api/movies", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  const parsedValue = parseInt(value);
  if (filter && parsedValue)
    return res.send(
      movies.filter((movie) => movie[filter].includes(parsedValue))
    );
  return res.send(movies);
});

app.post("/api/movies", (req, res) => {
  const { body } = req;
  console.log(body);
  const newMovie = { id: movies[movies.length - 1].id + 1, ...body };
  movies.push(newMovie);
  return res.status(201).send(newMovie);
});

app.get("/api/movies/:id", (req, res) => {
  console.log(req.params.id);
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const movie_req = movies.find((movie) => {
    if (movie.id === parsedId) return movie;
  });

  if (movie_req) return res.status(200).json(movie_req);
  return res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`);
});

app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findMovieIndex = movies.findIndex((movie) => movie.id === parsedId);

  if (findMovieIndex === -1) return res.sendStatus(404);
  movies[findMovieIndex] = { id: parsedId, ...body };
  return res.sendStatus(200)  
});
