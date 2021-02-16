const fs = require('fs');

module.exports = {
  extractMoviesFromFile: (filePath) => {
    const movies = [];
    try {
      const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

      const rawItems = data.split('\n\n');

      rawItems.forEach((rawItem) => {
        const lines = rawItem.split(/\n/);

        const title = lines[0].split('Title: ')[1].trim();
        const releaseYear = lines[1].split('Release Year: ')[1].trim();
        const format = lines[2].split('Format: ')[1].trim();
        const stars = lines[3]
          .split('Stars: ')[1]
          .split(', ')
          .map((star) => star.trim());

        movies.push({ title, releaseYear, format, stars });
      });

      return movies;
    } catch (err) {
      throw new Error('Error reading file!');
    }
  },
};
