const ErrorWithStatus = require('../helpers/errorWithStatus');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const required = (field) => [true, `"${field}" is required!`];
const currentYear = new Date().getFullYear();
const allowedMovieFormats = ['VHS', 'DVD', 'Blu-Ray'];
const fullNameRegex = /^[^\s]+( [^\s]+)+$/;
const isFullNameValid = (fullName) =>
  fullName.length >= 5 && fullName.length <= 50 && fullName.match(fullNameRegex);

const MovieSchema = new Schema(
  {
    title: {
      type: String,
      required: required('Title'),
      minlength: [2, 'Movie title must be at least 2 characters length.'],
      maxlength: [255, "Movie title can't have too many characters."],
    },
    releaseYear: {
      type: Number,
      required: required('Year'),
      min: [
        1888,
        "Sorry, but 'Roundhay Garden Scene' is an 1888 short silent actuality film. It is believed to be the oldest surviving film in existence.",
      ],
      max: [currentYear, `Sorry, but it's only ${currentYear}`],
    },
    format: {
      type: String,
      required: required('Format'),
      enum: {
        values: allowedMovieFormats,
        message: `Allowed movie formats: ${allowedMovieFormats.join(', ')}`,
      },
    },
    stars: {
      type: [String],
      required: true,
      validate: [
        {
          validator: (arr) => arr.length >= 1,
          message: 'Please, add some stars from the movie',
        },
        {
          validator: (arr) => arr.every((fullName) => isFullNameValid(fullName)),
          message: 'Please, provide correct star full name',
        },
      ],
    },
  },
  { versionKey: false },
);


MovieSchema.pre('save',async function (next) {
  const {title, releaseYear} = this;
  const stars = this.stars.map(star => star.toLowerCase());
  const uniqStars = [...new Set(stars)];

  if (stars.length !== uniqStars.length){
    throw new ErrorWithStatus(422,'Stars should be unique!')
  }

  const duplicate = await this.constructor.findOne({
    title:  { $regex :  new RegExp(title, "i") },
    releaseYear
  }).lean();
  if (duplicate){
    throw new ErrorWithStatus(422, `Movie "${title}" (${releaseYear}) already exists!`)
  }

  next()
})

module.exports = mongoose.model('Movie', MovieSchema);
