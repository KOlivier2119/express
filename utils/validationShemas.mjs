export const createMovieValidationSchema = {
  name: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
      "Name must have atleast 3-32 characters"
    },
    notEmpty: {
        errorMessage: 
        "Movie name cannot be empty"
    },
    isString: {
        errorMessage: "Name must be a string"
    },
  },

  year: {
    notEmpty: {
        errorMessage: 
        "Movie year cannot be empty"
    }
  }
};


