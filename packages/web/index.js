const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');

const app = express();

const HTTP_PORT = 3000;
const env = {
  NODE_ENV: process.env.NODE_ENV,
  DEBUG_ENABLED: process.env.DEBUG_ENABLED,
  API_URL: process.env.API_URL,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  SENTRY_DSN: process.env.SENTRY_DSN,
};

let HTML = fs.readFileSync(path.join(__dirname, 'build', 'index.html'), 'utf8');
HTML = HTML.toString().replace('__SERVER_DATA__', JSON.stringify({
  env,
}));

app.use(compression());

app.get('/', (req, res) => {
  res.send(HTML);
});

app.use('/', express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.send(HTML);
});

app.listen(HTTP_PORT, () => {
  console.log(`Server live on port ${HTTP_PORT}`);
});
