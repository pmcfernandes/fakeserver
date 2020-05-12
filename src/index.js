'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const app = express();
const routes = require('./routes');

app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 16 * 1024 * 1024 * 1024 // 16MB max upload
    }
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log('App is listening on port ' + port + '.');
});
