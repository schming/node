
const config = require('config');
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Password: ' + config.get('mail.password'));

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Cartoon'},
    {id: 4, name: 'Romance'}
];

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = findGenre(req.params.id);
    if(!genre) return res.status(404).send(`No genre with ID ${req.params.id} was found`);

    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = findGenre(req.params.id);
    if(!genre) return res.status(404).send(`No genres with Id ${req.params.id} was found`);

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = findGenre(req.params.id);
    if(!genre) return res.status(404).send(`No genres with Id ${req.params.id} was found`);

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

function findGenre(id) {
    return genres.find(g => g.id == id);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});