/*
		I think my models are structured in an object-oriented way, i.e.,
		'customers', and 'homes' rather than 'assessment'. Should models be broken
		down by service or purpose, rather than some subjective object description?
*/

// browserify
// JWT auth
// routers in ./APIs
// models in ./models

const express      = require('express');
const Path         = require('path');
const bodyParser   = require('body-parser');
const morgan       = require('morgan');
const routes       = express.Router();

const assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

if (process.env.NODE_ENV !== 'test') {
  const app = express();

  //HTTP request logger middleware
  app.use(require('morgan')('dev'));

  //parse request body and url parameters as JSON
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //Mount main router to app
  app.use('/', routes);

  // begin the api structure
  const customersAPI = require('./apis/customers-api');
  const homesAPI = require('./apis/homes-api');
  routes.use('/customers', customersAPI);
  routes.use('/homes', homesAPI);

  //Catch-all Route (needs to go last so it doesn't interfere with other routes)
  routes.get('/*', function (req, res) {
    console.log('***this is a catch-all route!***');

    res.sendFile(assetFolder + '/index.html');
  });

  // Start the server!
  var server = require('http').createServer(app);
  var port = process.env.PORT || 2100;
  server.listen(port);

  console.log('Listening on port', port);
} else {
  // When testing, make this file exportable.
  module.exports = routes;
};