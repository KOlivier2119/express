import express from "express";

const app = express();
import { createMovieValidationSchema } from "./utils/validationShemas.mjs";
import movieRouter from "./routes/movies.mjs";
import { movies } from "./utils/constants.mjs";
import productRouter from './routes/products.mjs'

app.use(movieRouter);
app.use(productRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`);
});
