const app = require('../../server');
const request = require('supertest');

const makePostRequest = async (host, path, data) => {
  return request(app).post(path).set('host', host).send(data);
};

module.exports = {
  makePostRequest,
};
