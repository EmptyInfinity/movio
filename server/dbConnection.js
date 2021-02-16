const DATABASE_URL =
  'mongodb+srv://movioUser:movioPassword@moviocluster.u1zn0.mongodb.net/movioDB?retryWrites=true&w=majority';
const mongoose = require('mongoose');

const initDbConnection = (callback) => {
  mongoose.connect(
    DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => {
      console.log(`Connected to db ${mongoose.connection.name}`);
    },
  );
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => callback());
};

module.exports = initDbConnection;
