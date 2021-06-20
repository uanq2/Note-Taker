// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const uuidv4 = require('uuid');
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let notes = [];

// Routes
app.use('*', (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, 'db/db.json')));

// Create New Characters - takes in JSON input
app.post('/api/notes', (req, res) => {
    const addNote = req.body;
    addNote.id = uuidv4();
    notes.push(addNote);
    writeFileAsync(path.join(__dirname, "db/db.json"), JSON.stringify(notes));
    res.json(addNote);
});

app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter((note) => note.id !== req.params.id);
    writeFileAsync(path.join(__dirname, "db/db.json"), JSON.stringify(notes));
    res.sendStatus(200);
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));