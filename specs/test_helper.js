const mongoose = require('mongoose');
const DATABASE_URL =
  'mongodb+srv://movioUser:movioPassword@moviocluster.u1zn0.mongodb.net/testDB?retryWrites=true&w=majority';

const removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
};

jest.setTimeout(10000);

beforeAll(async (done) => {
  await mongoose
    .connect(
      DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => {},
    )
    .catch((err) => {
      console.error('Connection error: ', err);
      throw err;
    });

  await removeAllCollections().catch((error) => {
    console.error('beforeAll [removeAllCollections]: ', error);
  });

  done();
});

afterAll(async (done) => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error('afterAll: ', error);
  }
  return done();
});

beforeEach(async (done) => {
  try {
    await removeAllCollections();
  } catch (error) {
    console.error('beforeEach: ', error);
  }
  return done();
});

afterEach(async (done) => {
  try {
    await removeAllCollections();
  } catch (error) {
    console.error('afterEach: ', error);
  }
  return done();
});
