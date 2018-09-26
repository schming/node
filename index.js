
const debug = require('debug')('app:startup');
const express = require('express');
const app = express();

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Cartoon'},
    {id: 4, name: 'Romance'}
];

app.get('/', (req, res) => {
    res.send(genres);
});

app.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id == req.params.id);
    if(!genre) return res.status(404).send(`No genre with ID ${id} was found`);

    res.send(genre);
});

app.listen(4200, () => {
    console.log('App is listening on port 4200');
});