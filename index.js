
const home = require('./routes/home');
const genres = require('./routes/genres');
const debug = require('debug')('app:startup');
const config = require('config');
const Joi = require('joi');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

if(app.get('env') === 'development') {
// Configuration
    debug('Application Name: ' + config.get('name'));
    debug('Mail Server: ' + config.get('mail.host'));
    debug('Password: ' + config.get('mail.password'));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});