'use strict';

const express = require('express');
const routes = express.Router();

const RestfullController = require('./controllers/RestfullController');
const UploadController = require('./controllers/UploadController');

routes.get('/:d', RestfullController.all);
routes.get('/:d/:id', RestfullController.get);
routes.post('/:d', RestfullController.insert);
routes.put('/:d/:id', RestfullController.update);
routes.delete('/:d/:id', RestfullController.delete);
routes.post('/upload', UploadController.upload)

module.exports = routes;