
const debug = require('debug')('app:startup');
const express = require('express');
const app = express();

app.use(express.json());

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
    const genre = genres.find(g => g.id == req.params.id);
    if(!genre) return res.status(404).send(`No genre with ID ${req.params.id} was found`);

    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id == req.params.id);
    if(!genre) return res.status(404).send(`No genres with Id ${req.params.id} was found`);

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});