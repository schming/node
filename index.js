
// Express
const express = require('express');
const app = express();

// Packages
const debug = require('debug')('app:startup');
const envDebug = require('debug')('app:env');
const config = require('config');
const Joi = require('joi');

// Modules
const home = require('./routes/home');
const genres = require('./routes/genres');
const morgan = require('morgan');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);
app.use(morgan('tiny'));

envDebug('Port: ' + process.env.PORT);
envDebug('Environment: ' + process.env.NODE_ENV);
envDebug('Debug namespace: ' + process.env.DEBUG);

if(app.get('env') === 'development') {
    debug('Application Name: ' + config.get('name'));
    debug('Mail Server: ' + config.get('mail.host'));
    debug('Password: ' + config.get('mail.password'));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});