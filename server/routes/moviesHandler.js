const Movie = require('../models/Movie');
const { extractMoviesFromFile } = require('../helpers/helper');
const ErrorWithStatus = require('../helpers/errorWithStatus');

module.exports = {
  save: async (req, res, next) => {
    try {
      const movie = new Movie(req.body);
      await movie.save();

      res.status(200).send(movie);
    } catch (err) {
      return next(err);
    }
  },

  fetchAll: async (req, res, next) => {
    try {
      const movies = await Movie.find().lean();

      res.status(200).send(movies);
    } catch (err) {
      return next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await Movie.findByIdAndDelete(req.params.id);

      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  },

  upload: async (req, res, next) => {
    let movies = [];
    try {
      const { file } = req;

      if (!file) {
        throw new ErrorWithStatus(500, 'Error, uploading file!');
      }

      try {
        movies = extractMoviesFromFile(file.path);
      } catch (err) {
        throw new ErrorWithStatus(500, 'Error reading file!');
      }

      await Movie.insertMany(movies);

      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  },
};
