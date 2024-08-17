import { movies } from "./constants.mjs";
export const resolveMovieById = (req, res, next) => {
    const {
      params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
  
    const findMovieIndex = movies.findIndex((movie) => movie.id === parsedId);
  
    if (findMovieIndex === -1) return res.sendStatus(404);
    req.findMovieIndex = findMovieIndex;
    next();
  };