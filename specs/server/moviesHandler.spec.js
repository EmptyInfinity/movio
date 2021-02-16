// const movieModel = require('../../server/models/movie');
const { makePostRequest } = require('../support/requests');

const shared = {};

const movieForm = {
  title: 'Movie',
  format: 'DVD',
  stars: ['Leonardo Di Caprio'],
  releaseYear: 2020,
};

describe('/POST movie', () => {
  beforeEach(async (done) => {
    done();
  });

  it(`should add movie`, async (done) => {
    const res = await makePostRequest('localhost:4005', `/api/movies`, movieForm);

    expect(res.statusCode).toEqual(200);
    console.log(res.body);
    done();
  });
});
