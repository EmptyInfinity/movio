const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4004;
const router = require('./router');
const errorsMiddleware = require('./errorsMiddleware');
const initDBConnection = require('./dbConnection');
const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  initDBConnection(() => {
    console.log('DB connected');
  });
}

app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorsMiddleware);

app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;
