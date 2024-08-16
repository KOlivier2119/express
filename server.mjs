import express from "express";
import cookieParser from "cookie-parser";
import { createMovieValidationSchema } from "./utils/validationShemas.mjs";
import movieRouter from "./routes/movies.mjs";
import { movies } from "./utils/constants.mjs";
import productRouter from "./routes/products.mjs";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "olivier the programmer",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(movieRouter);
app.use(productRouter);

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "World", { maxAge: 12000 * 120 * 60, signed: true });
  res.status(201).send({ msg: "Hello" });
});

app.post("/api/auth", (req, res) => {
  const {
    body: { name, password },
  } = req;
  const findMovie = movies.find((movie) => movie.name === name);
  if (!findMovie || findMovie.password !== password)
    return res.status(401).send({ msg: "BAD CREDENTIALS" });

  req.session.movie = findMovie;
  return res.status(200).send(findMovie);
});

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });

  return req.session.movie
    ? res.status(200).send(req.session.movie)
    : res.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/cart", (req, res) => {
  if (!req.session.movie) return res.sendStatus(401);
  const { body: item } = req;
  let { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  res.status(201).send(item);
});

app.get("/api/cart", (req, res) => {
  if (!req.session.movie) return res.sendStatus(401)
  req.session.cart
    ? res.status(200).send(req.session.cart)
    : res.send([]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`);
});
