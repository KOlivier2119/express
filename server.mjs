import express from "express";
import cookieParser from "cookie-parser";
import { createMovieValidationSchema } from "./utils/validationShemas.mjs";
import movieRouter from "./routes/movies.mjs";
import { movies } from "./utils/constants.mjs";
import productRouter from "./routes/products.mjs";

const app = express();

app.use(express.json())
app.use(cookieParser('helloworld'))
app.use(movieRouter);
app.use(productRouter);

app.get("/", (req, res) => {
  res.cookie('hello', 'World', { maxAge: 12000 * 120 * 60, signed: true})
  res.status(201).send({ msg: "Hello" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`);
});
